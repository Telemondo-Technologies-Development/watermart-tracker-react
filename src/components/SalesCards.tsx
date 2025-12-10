interface SalesCardsProps {
  dailyTotal: number
  monthlyTotal: number
}

export function SalesCards({ dailyTotal, monthlyTotal }: SalesCardsProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white rounded-xl p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover w-full border-l-4 border-primary-blue">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📊</span>
            <h3 className="text-sm text-dark-gray uppercase tracking-wider font-semibold">Today's Sales</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-primary-blue leading-none">{dailyTotal}</p>
            <span className="text-sm text-dark-gray font-medium">gallons</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover w-full border-l-4 border-accent-cyan">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📈</span>
            <h3 className="text-sm text-dark-gray uppercase tracking-wider font-semibold">Monthly Sales</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-accent-cyan leading-none">{monthlyTotal}</p>
            <span className="text-sm text-dark-gray font-medium">gallons</span>
          </div>
        </div>
      </div>
    </div>
  )
}