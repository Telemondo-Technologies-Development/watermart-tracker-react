import type React from "react"
import { useState } from "react"
import type { Customer } from "../types"
import "../styles/Modal.css"
import "../styles/CustomerDetailsModal.css"

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{customer.name}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="customer-details">
          <section className="detail-section" aria-labelledby="customer-info-heading">
            <h3 id="customer-info-heading">Customer Information</h3>
            {!showEditInfo ? (
              <section>
                <p>
                  <strong>Name:</strong> {customer.name}
                </p>
                <p>
                  <strong>Address:</strong> {customer.address}
                </p>
                <p>
                  <strong>Total Gallons Ordered:</strong> {totalGallons}
                </p>
                <button className="btn btn-secondary" onClick={() => setShowEditInfo(true)}>
                  Edit Information
                </button>
              </section>
            ) : (
              <form onSubmit={handleEditInfo} className="form">
                <div className="form-group">
                  <label htmlFor="edit-name">Name</label>
                  <input
                    id="edit-name"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-address">Address</label>
                  <input
                    id="edit-address"
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditInfo(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </section>

          <div className="detail-section">
            <h3>Order History</h3>
            {customer.orders.length > 0 ? (
              <div className="orders-list">
                {customer.orders.map((order) => (
                  <div key={order.id} className="order-item">
                    <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                    <span className="order-gallons">{order.gallons} gallons</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No orders yet</p>
            )}
          </div>

          {/* Add margin-top to this container */}
          <div className="form-actions add-order-actions">
            {!showAddOrder ? (
              <button className="btn btn-primary" onClick={() => setShowAddOrder(true)}>
                Add New Order
              </button>
            ) : (
              <form onSubmit={handleAddOrder} className="form">
                <div className="form-group">
                  <label htmlFor="new-gallons">Order Quantity (Gallons)</label>
                  <input
                    id="new-gallons"
                    type="number"
                    min="1"
                    value={newGallons}
                    onChange={(e) => setNewGallons(e.target.value)}
                    placeholder="Enter gallons"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddOrder(false)}>
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
