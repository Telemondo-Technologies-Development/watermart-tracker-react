import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart" // Add this import
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { db } from "@/lib/Database"

type TimeRange = "7days" | "30days" | "thisMonth" | "lastMonth"

interface OrderDistributionChartProps {
  timeRange: TimeRange
}

interface DistributionData {
  month: string
  orders: number
}

export function OrderDistributionChart({ timeRange }: OrderDistributionChartProps) {
  const [distributionData, setDistributionData] = useState<DistributionData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [trendPercentage, setTrendPercentage] = useState<number>(0)

  // Add chart configuration for shadcn
  const chartConfig = {
    orders: {
      label: "Orders",
      color: "#00a896",
    },
  }

  useEffect(() => {
    const loadDistributionData = async () => {
      setIsLoading(true)
      try {
        const now = new Date()
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        
        // orders from the last 6 months
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(now.getMonth() - 5)
        sixMonthsAgo.setDate(1)
        sixMonthsAgo.setHours(0, 0, 0, 0)

        const orders = await db.orders
          .where('date')
          .aboveOrEqual(sixMonthsAgo)
          .toArray()

        // group by month
        const monthlyData: { [key: string]: number } = {}
        
        orders.forEach(order => {
          const orderDate = new Date(order.date)
          const monthName = `${months[orderDate.getMonth()]} ${orderDate.getFullYear()}`
          
          if (!monthlyData[monthName]) {
            monthlyData[monthName] = 0
          }
          monthlyData[monthName] += 1
        })

        // convert to array and sort, make sure to get last 6 months
        const dataArray = Object.entries(monthlyData)
          .map(([month, orders]) => ({ month, orders }))
          .sort((a, b) => {
            const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            const aMonth = a.month.split(' ')[0]
            const bMonth = b.month.split(' ')[0]
            return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth)
          })

        // if less than 6 months of data, fill with zeros
        if (dataArray.length < 6) {
          // create last 6 months array
          const lastSixMonths: DistributionData[] = []
          for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
            const monthName = `${months[date.getMonth()]} ${date.getFullYear()}`
            
            const existingData = dataArray.find(d => d.month === monthName)
            lastSixMonths.push(existingData || { month: monthName, orders: 0 })
          }
          setDistributionData(lastSixMonths)
        } else {
          setDistributionData(dataArray.slice(-6)) // Take only last 6 months
        }

        // trend percentage calculation
        if (dataArray.length >= 2) {
          const current = dataArray[dataArray.length - 1].orders
          const previous = dataArray[dataArray.length - 2].orders
          const percentage = previous > 0 ? ((current - previous) / previous) * 100 : 0
          setTrendPercentage(parseFloat(percentage.toFixed(1)))
        }
      } catch (error) {
        console.error('Failed to load distribution data:', error)
        // fallback test data
        setDistributionData([
          { month: "Jan 2024", orders: 186 },
          { month: "Feb 2024", orders: 305 },
          { month: "Mar 2024", orders: 237 },
          { month: "Apr 2024", orders: 73 },
          { month: "May 2024", orders: 209 },
          { month: "Jun 2024", orders: 214 },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadDistributionData()
  }, [timeRange])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order Distribution</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    )
  }

  if (distributionData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order Distribution</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-gray-500">No orders for the selected period</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Distribution</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={distributionData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="orders" fill="#00a896" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trendPercentage >= 0 ? 'Trending up' : 'Trending down'} by {Math.abs(trendPercentage)}%
          {trendPercentage >= 0 ? 
            <TrendingUp className="h-4 w-4" /> : 
            <TrendingDown className="h-4 w-4" />
          }
        </div>
        <div className="leading-none text-muted-foreground">
          Showing order count for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}