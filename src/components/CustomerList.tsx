import type { Customer } from "../types"

interface CustomerListProps {
  customers: Customer[]
  onSelectCustomer: (customer: Customer) => void
}

export function CustomerList({ customers, onSelectCustomer }: CustomerListProps) {
  if (customers.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[300px] text-center p-8 bg-light-blue rounded-xl text-dark-gray">
        <p>No customers found. Add your first customer to get started!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      {customers.map((customer) => (
        <li
          key={customer.id}
          className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-transparent cursor-pointer transition-all duration-200 shadow-sm hover:border-primary-blue hover:bg-light-blue hover:shadow-custom-hover hover:translate-x-1"
          onClick={() => onSelectCustomer(customer)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSelectCustomer(customer)
          }}
        >
          <div className="flex-1">
            <h4 className="text-lg mb-1 text-very-dark font-semibold">{customer.name}</h4>
            <p className="text-sm text-dark-gray mb-1">{customer.address}</p>
            <p className="text-xs text-dark-gray">Total No. Orders: {customer.orders.length}</p>
          </div>
          <div className="pl-6 text-right">
            <p className="text-2xl font-bold text-accent-cyan leading-none mb-1">
              {customer.orders.reduce((sum, order) => sum + order.gallons, 0)}
            </p>
            <span className="text-xs text-dark-gray font-medium">Gallons Ordered (Total)</span>
          </div>
        </li>
      ))}
    </div>
  )
}