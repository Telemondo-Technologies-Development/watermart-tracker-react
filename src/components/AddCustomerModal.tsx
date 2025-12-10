import type React from "react"
import { useState } from "react"

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
      className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-[90%] max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray sticky top-0 bg-white">
          <h2 id="modal-title" className="text-xl text-very-dark font-semibold">Add New Customer</h2>
          <button 
            className="bg-transparent border-none text-xl text-dark-gray cursor-pointer w-8 h-8 flex items-center justify-center transition-all hover:text-primary-blue hover:scale-110"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-2 text-very-dark text-sm">Customer Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter customer name"
              required
              className="w-full px-3 py-2 border border-gray rounded-md focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block font-semibold mb-2 text-very-dark text-sm">Address</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter customer address"
              required
              className="w-full px-3 py-2 border border-gray rounded-md focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="gallons" className="block font-semibold mb-2 text-very-dark text-sm">Initial Order (Gallons)</label>
            <input
              id="gallons"
              type="number"
              min="1"
              value={gallons}
              onChange={(e) => setGallons(e.target.value)}
              placeholder="Enter number of gallons"
              required
              className="w-full px-3 py-2 border border-gray rounded-md focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onClose}
            >
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