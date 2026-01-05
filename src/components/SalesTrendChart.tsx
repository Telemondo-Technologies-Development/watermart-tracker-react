import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { db } from "@/lib/Database"

type TimeRange = "7days" | "30days" | "thisMonth" | "lastMonth"

interface SalesTrendChartProps {
  timeRange: TimeRange
}

interface SalesData {
  month: string
  gallons: number
}

export function SalesTrendChart({ timeRange }: SalesTrendChartProps) {
  const [salesTrendData, setSalesTrendData] = useState<SalesData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [trendPercentage, setTrendPercentage] = useState<number>(0)

  const chartConfig = {
    gallons: {
      label: "Gallons",
      color: "#3b82f6",
    },
  }

  useEffect(() => {
    const loadSalesData = async () => {
      setIsLoading(true)
      try {
        const now = new Date()
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(now.getMonth() - 5)
        sixMonthsAgo.setDate(1)
        sixMonthsAgo.setHours(0, 0, 0, 0)

        const orders = await db.orders
          .where('date')
          .aboveOrEqual(sixMonthsAgo)
          .toArray()

        const monthlyData: { [key: string]: number } = {}
        
        orders.forEach(order => {
          const orderDate = new Date(order.date)
          const monthKey = `${orderDate.getFullYear()}-${orderDate.getMonth()}`
          
          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = 0
          }
          monthlyData[monthKey] += order.gallons
        })

        const dataArray = Object.entries(monthlyData)
          .map(([key, gallons]) => {
            const [year, month] = key.split('-').map(Number)
            return {
              month: `${months[month]} ${year}`,
              gallons,
              sortKey: year * 12 + month
            }
          })
          .sort((a, b) => a.sortKey - b.sortKey)
          .slice(-6)
          .map(({ month, gallons }) => ({ month, gallons }))

        setSalesTrendData(dataArray)

        if (dataArray.length >= 2) {
          const current = dataArray[dataArray.length - 1].gallons
          const previous = dataArray[dataArray.length - 2].gallons
          const percentage = previous > 0 ? ((current - previous) / previous) * 100 : 0
          setTrendPercentage(parseFloat(percentage.toFixed(1)))
        }
      } catch (error) {
        console.error('Failed to load sales data:', error)
        setSalesTrendData([
          { month: "Jan 2024", gallons: 320 },
          { month: "Feb 2024", gallons: 450 },
          { month: "Mar 2024", gallons: 380 },
          { month: "Apr 2024", gallons: 220 },
          { month: "May 2024", gallons: 410 },
          { month: "Jun 2024", gallons: 390 },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadSalesData()
  }, [timeRange])

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Sales Trend</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="gallons"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trendPercentage >= 0 ? 'Trending up' : 'Trending down'} by {Math.abs(trendPercentage)}% this period
          {trendPercentage >= 0 ? 
            <TrendingUp className="h-4 w-4" /> : 
            <TrendingDown className="h-4 w-4" />
          }
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total gallons for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}