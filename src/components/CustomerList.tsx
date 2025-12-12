import type { Customer } from "../types"
import { Button } from "@/components/ui/button"
import { WaterDropIcon } from "@/components/ui/water-icons"

interface CustomerListProps {
  customers: Customer[]
  onSelectCustomer: (customer: Customer) => void
}

export function CustomerList({ customers, onSelectCustomer }: CustomerListProps) {
  if (customers.length === 0) {
    return (
      <div className="text-center py-12">
        <WaterDropIcon className="w-12 h-12 text-gray mx-auto mb-4" />
        <p className="text-dark-gray mb-4">No customers found</p>
        <p className="text-sm text-dark-gray/60">Add your first customer to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {customers.map((customer) => {
        const totalGallons = customer.orders.reduce((sum, order) => sum + order.gallons, 0)
        
        return (
          <div
            key={customer.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray/30 hover:border-primary-blue/30 hover:shadow-sm transition-all duration-200 cursor-pointer group"
            onClick={() => onSelectCustomer(customer)}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-light-blue/30 rounded-lg">
                  <WaterDropIcon className="w-4 h-4 text-primary-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-very-dark group-hover:text-primary-blue transition-colors">
                    {customer.name}
                  </h3>
                  <p className="text-sm text-dark-gray truncate max-w-md">
                    {customer.address}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-primary-blue">
                  {totalGallons} gallons
                </p>
                <p className="text-xs text-dark-gray">
                  {customer.orders.length} order{customer.orders.length !== 1 ? 's' : ''}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="View details"
              >
                →
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}