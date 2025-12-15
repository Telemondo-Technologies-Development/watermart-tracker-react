import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WaterBottleIcon, TrendingUpIcon } from "@/components/ui/water-icons"

interface SalesCardsProps {
  dailyTotal: number
  monthlyTotal: number
}

export function SalesCards({ dailyTotal, monthlyTotal }: SalesCardsProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <Card className="border-l-4 border-primary-blue hover:border-primary-blue/80">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-light-blue/30 rounded-lg">
              <WaterBottleIcon className="w-5 h-5 text-primary-blue" />
            </div>
            <CardTitle>Today's Sales</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-primary-blue leading-none">{dailyTotal}</p>
            <span className="text-sm text-dark-gray font-medium">gallons</span>
          </div>
          <div className="mt-3 h-2 w-full bg-gray/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-blue to-accent-cyan rounded-full transition-all duration-500"
              style={{ width: `${Math.min((dailyTotal / 1000) * 100, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-accent-cyan hover:border-accent-cyan/80">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-cyan/20 rounded-lg">
              <TrendingUpIcon className="w-5 h-5 text-accent-cyan" />
            </div>
            <CardTitle>Monthly Sales</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-accent-cyan leading-none">{monthlyTotal}</p>
            <span className="text-sm text-dark-gray font-medium">gallons</span>
          </div>
          <div className="mt-3 h-2 w-full bg-gray/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent-cyan to-primary-blue rounded-full transition-all duration-500"
              style={{ width: `${Math.min((monthlyTotal / 5000) * 100, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}