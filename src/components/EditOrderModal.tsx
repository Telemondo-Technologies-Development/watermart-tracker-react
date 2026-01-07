import { useState } from "react"
import { useForm } from "react-hook-form"
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
import { WaterDropIcon } from "@/components/ui/water-icons"

const editOrderSchema = z.object({
  gallons: z
    .string()
    .min(1, "Gallons is required")
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => Number(val) >= 1, "Gallons must be at least 1")
    .refine((val) => Number.isInteger(Number(val)), "Must be a whole number"),
})

type EditOrderFormValues = z.infer<typeof editOrderSchema>

interface EditOrderModalProps {
  order: {
    id: string
    gallons: number
    date: Date
  }
  onSave: (id: string, gallons: number) => void
  onDelete?: (id: string) => void
  onClose: () => void
  isOpen?: boolean
}

export function EditOrderModal({ 
  order, 
  onSave, 
  onDelete, 
  onClose, 
  isOpen = true 
}: EditOrderModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const form = useForm<EditOrderFormValues>({
    resolver: zodResolver(editOrderSchema),
    defaultValues: {
      gallons: order.gallons.toString(),
    },
  })

  const handleSubmit = (values: EditOrderFormValues) => {
    const gallons = parseInt(values.gallons, 10)
    onSave(order.id, gallons)
    onClose()
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(order.id)
      onClose()
    }
  }

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-5 max-w-md">
        <DialogHeader className="mb-4">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <WaterDropIcon className="w-4 h-4" />
            Edit Order Quantity
          </DialogTitle>
        </DialogHeader>
        
        {!showDeleteConfirm ? (
          <>
            {/* Original Order Details Display*/}
            <div className="mb-6 p-4 bg-light-blue/20 rounded-lg border border-gray/30">
              <h3 className="text-sm font-semibold text-dark-blue mb-3">Original Order Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-dark-gray mb-1">Order Placed:</p>
                  <p className="text-sm font-medium text-very-dark">{formatDateTime(order.date)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <WaterDropIcon className="w-4 h-4 text-accent-cyan" />
                  <span className="text-sm font-medium text-very-dark">Current Quantity:</span>
                  <span className="text-lg font-bold text-accent-cyan ml-auto">{order.gallons} gallons</span>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="gallons"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Gallons Quantity</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          min="1"
                          step="1"
                          placeholder="Enter new gallons amount"
                          className="text-lg font-semibold"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-3 justify-between pt-4">
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="destructive"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      Delete Order
                    </Button>
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </div>
                  <Button 
                    type="submit"
                    variant="water"
                    leftIcon={<WaterDropIcon className="w-4 h-4" />}
                  >
                    Update Gallons
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-error/10 border border-error/30 rounded-lg">
              <h3 className="font-semibold text-error mb-2">Delete Order</h3>
              <div className="space-y-3 mb-3">
                <p className="text-sm text-dark-gray">
                  Are you sure you want to delete this order?
                </p>
                <div className="text-sm space-y-2">
                  <div>
                    <p className="text-dark-gray mb-1">Order Details:</p>
                    <p className="font-medium">{formatDateTime(order.date)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-dark-gray">Quantity:</span>
                    <span className="font-bold text-error">{order.gallons} gallons</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-error font-medium">
                This action cannot be undone.
              </p>
            </div>
            
            <div className="flex gap-3 justify-end">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="destructive"
                onClick={handleDelete}
              >
                Delete Order
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}