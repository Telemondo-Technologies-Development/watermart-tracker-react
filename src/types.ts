export interface Order {
  id: string
  gallons: number
  date: Date
}

export interface Customer {
  id: string
  name: string
  address: string
  orders: Order[]
}