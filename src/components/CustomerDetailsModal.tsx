import type React from "react"
import { useState } from "react"
import type { Customer } from "../types"

interface CustomerDetailsModalProps {
  customer: Customer
  onAddOrder: (gallons: number) => void
  onEditCustomer: (name: string, address: string) => void
  onClose: () => void
}

export function CustomerDetailsModal({ customer, onAddOrder, onEditCustomer, onClose }: CustomerDetailsModalProps) {
  const [showAddOrder, setShowAddOrder] = useState(false)
  const [showEditInfo, setShowEditInfo] = useState(false)
  const [newGallons, setNewGallons] = useState("")
  const [editName, setEditName] = useState(customer.name)
  const [editAddress, setEditAddress] = useState(customer.address)

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGallons) {
      onAddOrder(Number.parseInt(newGallons))
      setNewGallons("")
      setShowAddOrder(false)
    }
  }

  const handleEditInfo = (e: React.FormEvent) => {
    e.preventDefault()
    if (editName && editAddress) {
      onEditCustomer(editName, editAddress)
      setShowEditInfo(false)
    }
  }

  const totalGallons = customer.orders.reduce((sum, order) => sum + order.gallons, 0)

  return (
    <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray sticky top-0 bg-white">
          <h2 className="text-xl text-very-dark font-semibold">{customer.name}</h2>
          <button 
            className="bg-transparent border-none text-xl text-dark-gray cursor-pointer w-8 h-8 flex items-center justify-center transition-all hover:text-primary-blue hover:scale-110"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <section className="border border-gray rounded-md p-4 bg-light-blue" aria-labelledby="customer-info-heading">
            <h3 id="customer-info-heading" className="text-lg text-primary-blue mb-4 font-semibold">Customer Information</h3>
            {!showEditInfo ? (
              <div>
                <p className="mb-2 text-very-dark leading-relaxed">
                  <strong className="text-dark-blue font-semibold">Name:</strong> {customer.name}
                </p>
                <p className="mb-2 text-very-dark leading-relaxed">
                  <strong className="text-dark-blue font-semibold">Address:</strong> {customer.address}
                </p>
                <p className="mb-4 text-very-dark leading-relaxed">
                  <strong className="text-dark-blue font-semibold">Total Gallons Ordered:</strong> {totalGallons}
                </p>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowEditInfo(true)}
                >
                  Edit Information
                </button>
              </div>
            ) : (
              <form onSubmit={handleEditInfo} className="space-y-4">
                <div>
                  <label htmlFor="edit-name" className="block font-semibold mb-2 text-very-dark text-sm">Name</label>
                  <input
                    id="edit-name"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray rounded-md focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                  />
                </div>
                <div>
                  <label htmlFor="edit-address" className="block font-semibold mb-2 text-very-dark text-sm">Address</label>
                  <input
                    id="edit-address"
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray rounded-md focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                  />
                </div>
                <div className="flex gap-4 justify-end">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowEditInfo(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </section>

          <div className="border border-gray rounded-md p-4 bg-light-blue">
            <h3 className="text-lg text-primary-blue mb-4 font-semibold">Order History</h3>
            {customer.orders.length > 0 ? (
              <div className="flex flex-col gap-2">
                {customer.orders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center px-4 py-2 bg-white rounded-md border-l-3 border-accent-cyan">
                    <span className="text-sm text-dark-gray font-medium">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                    <span className="text-base font-bold text-accent-cyan">
                      {order.gallons} gallons
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-very-dark">No orders yet</p>
            )}
          </div>

          <div className="flex gap-4 justify-end mt-6 pt-6 border-t border-gray">
            {!showAddOrder ? (
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddOrder(true)}
              >
                Add New Order
              </button>
            ) : (
              <form onSubmit={handleAddOrder} className="w-full space-y-4">
                <div>
                  <label htmlFor="new-gallons" className="block font-semibold mb-2 text-very-dark text-sm">Order Quantity (Gallons)</label>
                  <input
                    id="new-gallons"
                    type="number"
                    min="1"
                    value={newGallons}
                    onChange={(e) => setNewGallons(e.target.value)}
                    placeholder="Enter gallons"
                    required
                    className="w-full px-3 py-2 border border-gray rounded-md focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                  />
                </div>
                <div className="flex gap-4 justify-end">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowAddOrder(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Order
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}