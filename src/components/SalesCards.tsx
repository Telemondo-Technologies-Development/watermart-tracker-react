import "../styles/SalesCards.css"

interface SalesCardsProps {
  dailyTotal: number
  monthlyTotal: number
}

export function SalesCards({ dailyTotal, monthlyTotal }: SalesCardsProps) {
  return (
    <div className="sales-cards">
      <div className="card card-daily">
        <div className="card-content">
          <div className="card-header">
            <span className="card-icon">📊</span>
            <h3>Today's Sales</h3>
          </div>
          <div className="card-body">
            <p className="sales-number">{dailyTotal}</p>
            <span className="unit">gallons</span>
          </div>
        </div>
      </div>

      <div className="card card-monthly">
        <div className="card-content">
          <div className="card-header">
            <span className="card-icon">📈</span>
            <h3>Monthly Sales</h3>
          </div>
          <div className="card-body">
            <p className="sales-number">{monthlyTotal}</p>
            <span className="unit">gallons</span>
          </div>
        </div>
      </div>
    </div>
  )
}