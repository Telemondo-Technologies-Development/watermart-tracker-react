import React from "react"
import { useForm } from "react-hook-form"
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
import { WaterDropIcon } from "@/components/ui/water-icons"

type FormValues = {
  name: string
  address: string
  gallons: string 
}

interface AddCustomerModalProps {
  onAdd: (name: string, address: string, gallons: number) => void
  onClose: () => void
  isOpen?: boolean
}

export function AddCustomerModal({ onAdd, onClose, isOpen = true }: AddCustomerModalProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      address: "",
      gallons: "5",
    },
  })

  const handleSubmit = (values: FormValues) => {
    const gallons = parseInt(values.gallons, 10)
    if (!isNaN(gallons) && gallons >= 1) {
      onAdd(values.name, values.address, gallons)
      form.reset()
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6">
        <DialogHeader className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <WaterDropIcon className="w-5 h-5" />
                Add New Customer
              </DialogTitle>
              <DialogDescription>
                Add a new customer to the Watermart Tracker system.
              </DialogDescription>
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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter customer name" 
                      {...field} 
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
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
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
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
                  <FormLabel>Initial Order (Gallons)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      placeholder="Enter number of gallons"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-4 justify-end pt-4">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                variant="water"
                leftIcon={<WaterDropIcon className="w-4 h-4" />}
                isLoading={form.formState.isSubmitting}
              >
                Add Customer
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}