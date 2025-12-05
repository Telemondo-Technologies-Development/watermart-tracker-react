import type React from "react"
import { useState } from "react"
import "../styles/Modal.css"

interface AddCustomerModalProps {
  onAdd: (name: string, address: string, gallons: number) => void
  onClose: () => void
}

export function AddCustomerModal({ onAdd, onClose }: AddCustomerModalProps) {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [gallons, setGallons] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && address && gallons) {
      onAdd(name, address, Number.parseInt(gallons))
      onClose()
    }
  }

  return (
    
    <div 
    className="modal-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    onClick={onClose}>

      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Customer</h2>
          <button 
          className="close-btn" 
          onClick={onClose}
          aria-label="Close modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter customer address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gallons">Initial Order (Gallons)</label>
            <input
              id="gallons"
              type="number"
              min="1"
              value={gallons}
              onChange={(e) => setGallons(e.target.value)}
              placeholder="Enter number of gallons"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
