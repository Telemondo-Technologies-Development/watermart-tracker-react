import { X } from 'lucide-react'
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
} from "@/components/ui/dialog"
import { WaterDropIcon } from "@/components/ui/water-icons"

const addCustomerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
  gallons: z
    .string()
    .min(1, "Number of gallons is required")
    .refine((val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 1 && Number.isInteger(num);
    }, "Must be a whole number of at least 1"),
})

type FormValues = z.infer<typeof addCustomerSchema>

interface AddCustomerModalProps {
  onAdd: (name: string, address: string, gallons: number) => void
  onClose: () => void
  isOpen?: boolean
}

export function AddCustomerModal({ onAdd, onClose, isOpen = true }: AddCustomerModalProps) {
  const form = useForm<FormValues>({
  resolver: zodResolver(addCustomerSchema),
    defaultValues: {
    name: "",
    address: "",
    gallons: "1",
  },
})

  const handleSubmit = (values: FormValues) => {
  const gallons = parseInt(values.gallons, 10)
  onAdd(values.name, values.address, gallons)
  form.reset()
  onClose()
}

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-5">
        <DialogHeader className="mb-4 flex-row items-start">
          <div className="flex-1">
              <DialogTitle className="flex items-center gap-2 text-lg">
                <WaterDropIcon className="w-4 h-4" />
                Add New Customer
              </DialogTitle>
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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
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
            
            <div className="flex gap-4 justify-end pt-3">
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