import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts"
import { db } from "@/lib/Database"

type TimeRange = "7days" | "30days" | "thisMonth" | "lastMonth"

interface TopCustomersChartProps {
  timeRange: TimeRange
}

interface TopCustomerData {
  customer: string
  gallons: number
  fill: string
  [key: string]: string | number
}

const COLORS = ["#3b82f6", "#06b6d4", "#10b981", "#8b5cf6", "#6366f1", "#ec4899", "#f59e0b", "#ef4444"]

export function TopCustomersChart({ timeRange }: TopCustomersChartProps) {
  const [topCustomersData, setTopCustomersData] = useState<TopCustomerData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const chartConfig = {
    gallons: {
      label: "Gallons",
      color: "#3b82f6",
    },
  }

  useEffect(() => {
    const loadTopCustomers = async () => {
      setIsLoading(true)
      try {
        const range = getDateRange(timeRange)
        
        // get orders within the time range
        const orders = await db.orders
          .where('date')
          .between(range.start, range.end)
          .toArray()

        // get all customers
        const customers = await db.customers.toArray()
        
        // calculate gallons per customer
        const customerGallons: { [key: string]: { name: string; gallons: number } } = {}
        
        orders.forEach(order => {
          const customerId = order.customerId
          if (!customerGallons[customerId]) {
            const customer = customers.find(c => c.id === customerId)
            customerGallons[customerId] = {
              name: customer?.name || `Customer ${customerId}`,
              gallons: 0
            }
          }
          customerGallons[customerId].gallons += order.gallons
        })

        // convert to array, sort by gallons, and take top 5
        const topCustomers = Object.values(customerGallons)
          .sort((a, b) => b.gallons - a.gallons)
          .slice(0, 5)
          .map((customer, index) => ({
            customer: customer.name,
            gallons: customer.gallons,
            fill: COLORS[index % COLORS.length]
          }))

        setTopCustomersData(topCustomers)
      } catch (error) {
        console.error('Failed to load top customers:', error)
        // fallback test data
        setTopCustomersData([
          { customer: "Jo Kitahara", gallons: 275, fill: "#3b82f6" },
          { customer: "Jane Doe", gallons: 200, fill: "#06b6d4" },
          { customer: "John Smith", gallons: 187, fill: "#10b981" },
          { customer: "Aqua Supplies", gallons: 90, fill: "#6366f1" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadTopCustomers()
  }, [timeRange])

  const getDateRange = (range: TimeRange) => {
    const now = new Date()
    const start = new Date()
    
    switch (range) {
      case '7days':
        start.setDate(now.getDate() - 7)
        break
      case '30days':
        start.setDate(now.getDate() - 30)
        break
      case 'thisMonth':
        start.setDate(1)
        break
      case 'lastMonth':
        start.setMonth(now.getMonth() - 1)
        start.setDate(1)
        break
    }
    
    start.setHours(0, 0, 0, 0)
    const end = new Date()
    end.setHours(23, 59, 59, 999)
    
    return { start, end }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    )
  }

  if (topCustomersData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-gray-500">No customer data for the selected period</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Customers</CardTitle>
        <CardDescription>Based on gallons ordered in selected period</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topCustomersData}
                dataKey="gallons"
                nameKey="customer"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => {
                  const data = entry as unknown as { customer: string; gallons: number }
                  return `${data.customer}: ${data.gallons}`
                }}
              >
                {topCustomersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Top {topCustomersData.length} customers by total gallons
        </div>
      </CardFooter>
    </Card>
  )
}