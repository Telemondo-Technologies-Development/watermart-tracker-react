import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, Package, MenuIcon } from "lucide-react"
import { Sidebar } from "@/components/Sidebar"

type TimeRange = "7days" | "30days" | "thisMonth" | "lastMonth"

export function SalesReport() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7days")
  const [showSidebar, setShowSidebar] = useState(false)

  // Placeholder data - we'll replace with real data from Dexie later
  const stats = {
    totalCustomers: 128,
    totalOrders: 543,
    averageOrder: 4.2,
    totalGallons: 2281,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-blue to-white flex">
      <Sidebar isVisible={showSidebar} onClose={() => setShowSidebar(false)} />

      {/* Header - matches your current header style */}
      <div className="flex-1">
        <header className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-br from-primary-blue to-dark-blue text-white flex items-center px-8 z-50 shadow-custom">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 text-2xl mr-6"
            onClick={() => setShowSidebar(!showSidebar)}
            aria-label="Toggle menu"
            leftIcon={<MenuIcon className="w-6 h-6" />}
          />
          <div className="flex-1 flex flex-col items-end">
            <h1 className="text-2xl font-bold tracking-tight">Sales Report</h1>
            <p className="text-sm text-white/80 mt-1">Analytics & Performance Overview</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-20 p-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Time Range Filter */}
            <div className="mb-8 mt-8 flex gap-3 justify-end">
              <Button
                variant={timeRange === "7days" ? "water" : "secondary"}
                onClick={() => setTimeRange("7days")}
              >
                Last 7 Days
              </Button>
              <Button
                variant={timeRange === "30days" ? "water" : "secondary"}
                onClick={() => setTimeRange("30days")}
              >
                Last 30 Days
              </Button>
              <Button
                variant={timeRange === "thisMonth" ? "water" : "secondary"}
                onClick={() => setTimeRange("thisMonth")}
              >
                This Month
              </Button>
              <Button
                variant={timeRange === "lastMonth" ? "water" : "secondary"}
                onClick={() => setTimeRange("lastMonth")}
              >
                Last Month
              </Button>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Customers */}
              <Card className="border-l-4 border-primary-blue hover:shadow-card-hover transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-blue/10 rounded-lg">
                      <Users className="w-5 h-5 text-primary-blue" />
                    </div>
                    <CardTitle className="text-sm font-medium text-dark-gray">
                      Total Customers
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary-blue">{stats.totalCustomers}</p>
                  <p className="text-xs text-dark-gray mt-2">Active customers</p>
                </CardContent>
              </Card>

              {/* Total Orders */}
              <Card className="border-l-4 border-accent-cyan hover:shadow-card-hover transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-cyan/10 rounded-lg">
                      <Package className="w-5 h-5 text-accent-cyan" />
                    </div>
                    <CardTitle className="text-sm font-medium text-dark-gray">
                      Total Orders
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent-cyan">{stats.totalOrders}</p>
                  <p className="text-xs text-dark-gray mt-2">All time orders</p>
                </CardContent>
              </Card>

              {/* Average Order */}
              <Card className="border-l-4 border-success hover:shadow-card-hover transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <CardTitle className="text-sm font-medium text-dark-gray">
                      Average Order
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-success">{stats.averageOrder}</p>
                  <p className="text-xs text-dark-gray mt-2">gallons per order</p>
                </CardContent>
              </Card>

              {/* Total Gallons */}
              <Card className="border-l-4 border-dark-blue hover:shadow-card-hover transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-dark-blue/10 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-dark-blue" />
                    </div>
                    <CardTitle className="text-sm font-medium text-dark-gray">
                      Total Gallons
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-dark-blue">{stats.totalGallons.toLocaleString()}</p>
                  <p className="text-xs text-dark-gray mt-2">gallons sold</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section - Placeholders for now */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Trend Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-blue" />
                    Sales Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-light-blue/20 rounded-lg border-2 border-dashed border-gray">
                    <p className="text-dark-gray">Chart will go here (Recharts)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Top Customers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary-blue" />
                    Top Customers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-light-blue/20 rounded-lg border-2 border-dashed border-gray">
                    <p className="text-dark-gray">Top customers list/chart</p>
                  </div>
                </CardContent>
              </Card>

              {/* Order Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-accent-cyan" />
                    Order Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-light-blue/20 rounded-lg border-2 border-dashed border-gray">
                    <p className="text-dark-gray">Distribution chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}