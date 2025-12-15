import React, { useState } from "react"
import { useForm } from "react-hook-form"
import type { Customer } from "../types"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { WaterDropIcon, DeliveryTruckIcon } from "@/components/ui/water-icons"

type EditInfoValues = {
  editName: string
  editAddress: string
}

type AddOrderValues = {
  gallons: string
}

interface CustomerDetailsModalProps {
  customer: Customer
  onAddOrder: (gallons: number) => void
  onEditCustomer: (name: string, address: string) => void
  onClose: () => void
}

export function CustomerDetailsModal({ customer, onAddOrder, onEditCustomer, onClose }: CustomerDetailsModalProps) {
  const [showAddOrder, setShowAddOrder] = useState(false)
  const [showEditInfo, setShowEditInfo] = useState(false)

  // Edit Customer Form
  const editForm = useForm<EditInfoValues>({
    defaultValues: {
      editName: customer.name,
      editAddress: customer.address,
    },
  })

  // Add Order Form
  const orderForm = useForm<AddOrderValues>({
    defaultValues: {
      gallons: "1", 
    },
  })

  const handleEditSubmit = (data: EditInfoValues) => {
    onEditCustomer(data.editName, data.editAddress)
    setShowEditInfo(false)
  }

  const handleOrderSubmit = (data: AddOrderValues) => {
    const gallons = parseInt(data.gallons, 10)
    if (!isNaN(gallons) && gallons >= 1) {
      onAddOrder(gallons)
      orderForm.reset()
      setShowAddOrder(false)
    }
  }

  const totalGallons = customer.orders.reduce((sum, order) => sum + order.gallons, 0)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-6">
        <DialogHeader className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-xl flex items-center gap-2">
                <WaterDropIcon className="w-5 h-5" />
                {customer.name}
              </DialogTitle>
              <DialogDescription>Customer Details & Order History</DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close modal"
              className="ml-auto p-2"
            >
              ✕
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information Section */}
          <section className="border border-gray/30 rounded-lg p-5 bg-light-blue/20">
            <h3 className="text-lg text-primary-blue mb-4 font-semibold">
              Customer Information
            </h3>
            
            {!showEditInfo ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-dark-blue mb-1">Name</p>
                  <p className="text-very-dark">{customer.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-blue mb-1">Address</p>
                  <p className="text-very-dark">{customer.address}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-blue mb-1">Total Gallons Ordered</p>
                  <p className="text-2xl font-bold text-accent-cyan">{totalGallons} gallons</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setShowEditInfo(true)}
                  className="mt-4"
                >
                  Edit Information
                </Button>
              </div>
            ) : (
              <Form {...editForm}>
                <form onSubmit={editForm.handleSubmit(handleEditSubmit)} className="space-y-4">
                  <FormField
                    control={editForm.control}
                    name="editName"
                    rules={{
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter customer name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="editAddress"
                    rules={{
                      required: "Address is required",
                      minLength: {
                        value: 5,
                        message: "Address must be at least 5 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter customer address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-3 justify-end">
                    <Button 
                      type="button" 
                      variant="secondary"
                      onClick={() => setShowEditInfo(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </section>

          {/* Order History Section */}
          <section className="border border-gray/30 rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg text-primary-blue font-semibold flex items-center gap-2">
                <DeliveryTruckIcon className="w-5 h-5" />
                Order History
              </h3>
              {!showAddOrder && (
                <Button 
                  variant="accent"
                  onClick={() => setShowAddOrder(true)}
                  leftIcon={<span>+</span>}
                >
                  New Order
                </Button>
              )}
            </div>

            {showAddOrder ? (
              <div className="mb-6">
                <Form {...orderForm}>
                  <form onSubmit={orderForm.handleSubmit(handleOrderSubmit)} className="space-y-4">
                    <FormField
                      control={orderForm.control}
                      name="gallons"
                      rules={{
                        required: "Gallons is required",
                        validate: (value) => {
                          const num = parseInt(value, 10)
                          if (isNaN(num)) return "Must be a valid number"
                          if (num < 1) return "Gallons must be at least 1"
                          if (!Number.isInteger(num)) return "Must be a whole number"
                          return true
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Quantity (Gallons)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              min="1"
                              placeholder="Enter gallons"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-3 justify-end">
                      <Button 
                        type="button" 
                        variant="secondary"
                        onClick={() => setShowAddOrder(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary">
                        Add Order
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            ) : null}

            {customer.orders.length > 0 ? (
              <div className="space-y-3">
                {customer.orders.map((order) => (
                  <div 
                    key={order.id} 
                    className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray/30 hover:border-primary-blue/30 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-very-dark">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-dark-gray">
                        {new Date(order.date).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-accent-cyan">
                        {order.gallons} gallons
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-dark-gray mb-3">No orders yet</p>
                <Button 
                  variant="outline"
                  onClick={() => setShowAddOrder(true)}
                >
                  Add First Order
                </Button>
              </div>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}