import type { Customer } from "../types"
import "../styles/CustomerList.css"

interface CustomerListProps {
  customers: Customer[]
  onSelectCustomer: (customer: Customer) => void
}

export function CustomerList({ customers, onSelectCustomer }: CustomerListProps) {
  if (customers.length === 0) {
    return (
      <div className="empty-state">
        <p>No customers found. Add your first customer to get started!</p>
      </div>
    )
  }

  return (
    <div className="customer-list">
      {customers.map((customer) => (
        <li
          key={customer.id}
          className="customer-item"
          onClick={() => onSelectCustomer(customer)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSelectCustomer(customer)
          }}
        >
          <div className="customer-info">
            <h4>{customer.name}</h4>
            <p className="address">{customer.address}</p>
            <p className="total-orders">Total No. Orders: {customer.orders.length}</p>
          </div>
          <div className="customer-total">
            <p className="gallons">{customer.orders.reduce((sum, order) => sum + order.gallons, 0)}</p>
            <span>Gallons Ordered (Total)</span>
          </div>
        </li>
      ))}
    </div>
  )
}
