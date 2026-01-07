import React, { useState } from "react"
import { useForm } from "react-hook-form"
import type { Customer } from "../types"
import { X, Edit } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { EditOrderModal } from "@/components/EditOrderModal"

const editCustomerSchema = z.object({
  editName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  editAddress: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
})

const addOrderSchema = z.object({
  gallons: z
    .string()
    .min(1, "Gallons is required")
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => Number(val) >= 1, "Gallons must be at least 1")
    .refine((val) => Number.isInteger(Number(val)), "Must be a whole number"),
})

type EditInfoValues = z.infer<typeof editCustomerSchema>
type AddOrderValues = z.infer<typeof addOrderSchema>

interface CustomerDetailsModalProps {
  customer: Customer
  onAddOrder: (gallons: number) => void
  onEditCustomer: (name: string, address: string) => void
  onEditOrder: (orderId: string, gallons: number, date: Date) => void
  onDeleteOrder: (orderId: string) => void
  onClose: () => void
}

export function CustomerDetailsModal({ 
  customer, 
  onAddOrder, 
  onEditCustomer,
  onEditOrder,
  onDeleteOrder,
  onClose 
}: CustomerDetailsModalProps) {
  const [showAddOrder, setShowAddOrder] = useState(false)
  const [showEditInfo, setShowEditInfo] = useState(false)
  const [editingOrder, setEditingOrder] = useState<Customer['orders'][0] | null>(null)

  // Edit Customer Form
  const editForm = useForm<EditInfoValues>({
    resolver: zodResolver(editCustomerSchema),
    defaultValues: {
      editName: customer.name,
      editAddress: customer.address,
    },
  })

  // Add Order Form
  const orderForm = useForm<AddOrderValues>({
    resolver: zodResolver(addOrderSchema),
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

  const handleEditOrder = (orderId: string, gallons: number) => {
  // Find the existing order to preserve its date
  const existingOrder = customer.orders.find(order => order.id === orderId)
  if (existingOrder) {
    onEditOrder(orderId, gallons, existingOrder.date)
  }
  setEditingOrder(null)
  }

  const handleDeleteOrder = (orderId: string) => {
    onDeleteOrder(orderId)
    setEditingOrder(null)
  }

  const totalGallons = customer.orders.reduce((sum, order) => sum + order.gallons, 0)

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl p-5">
          <DialogHeader className="mb-4 flex-row items-start">
            <div className="flex-1">
              <DialogTitle className="text-lg flex items-center gap-2">
                <WaterDropIcon className="w-4 h-4" />
                {customer.name}
              </DialogTitle>
              <DialogDescription>Customer Details & Order History</DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1 hover:bg-gray/20 -mt-1"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogHeader>

          <div className="space-y-4">
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
                    variant="accent"
                    onClick={() => setShowEditInfo(true)}
                    className="mt-4"
                  >
                    Edit Information
                  </Button>
                </div>
              ) : (
                <Form {...editForm}>
                  <form onSubmit={editForm.handleSubmit(handleEditSubmit)} className="space-y-3">
                    <FormField
                      control={editForm.control}
                      name="editName"
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
                    <form onSubmit={orderForm.handleSubmit(handleOrderSubmit)} className="space-y-3">
                      <FormField
                        control={orderForm.control}
                        name="gallons"
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
                      className="group flex justify-between items-center p-4 bg-white rounded-lg border border-gray/30 hover:border-primary-blue/30 transition-colors"
                    >
                      <div className="flex-1">
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
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <p className="text-lg font-bold text-accent-cyan">
                            {order.gallons} gallons
                          </p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setEditingOrder(order)}
                            aria-label="Edit order"
                          >
                          <Edit className="w-4 h-4" />
                          </Button>
                        </div>
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

      {editingOrder && (
        <EditOrderModal
          order={editingOrder}
          onSave={handleEditOrder}
          onDelete={handleDeleteOrder}
          onClose={() => setEditingOrder(null)}
        />
      )}
    </>
  )
}