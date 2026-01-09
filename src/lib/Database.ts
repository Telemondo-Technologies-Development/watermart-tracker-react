import Dexie, { type EntityTable } from 'dexie'

export interface Customer {
  id: string
  name: string
  address: string
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  customerId: string
  gallons: number
  date: Date
  createdAt: Date
}

class WatermartDatabase extends Dexie {
  customers!: EntityTable<
    Customer,
    'id'
  >
  
  orders!: EntityTable<
    Order,
    'id'
  >

  constructor() {
    super('WatermartDatabase')
    
    this.version(1).stores({
      customers: 'id, name, createdAt',
      orders: 'id, customerId, date, createdAt'
    })
    
    this.version(2).stores({
      customers: 'id, name, createdAt',
      orders: 'id, customerId, date, createdAt, gallons'
    })
  }
}

export const db = new WatermartDatabase()

export const databaseService = {
  
  async getAllCustomers() {
    return await db.customers.toArray()
  },
  
  async getCustomer(id: string) {
    return await db.customers.get(id)
  },
  
  async addCustomer(customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) {
    const id = Date.now().toString()
    const now = new Date()
    const newCustomer: Customer = {
      ...customer,
      id,
      createdAt: now,
      updatedAt: now
    }
    await db.customers.add(newCustomer)
    return newCustomer
  },
  
  async updateCustomer(id: string, updates: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>) {
    const customer = await db.customers.get(id)
    if (customer) {
      const updatedCustomer = {
        ...customer,
        ...updates,
        updatedAt: new Date()
      }
      await db.customers.update(id, updatedCustomer)
      return updatedCustomer
    }
    return null
  },
  
  async deleteCustomer(id: string) {
    await db.orders.where('customerId').equals(id).delete()
    await db.customers.delete(id)
  },
  
  async getCustomerOrders(customerId: string) {
    return await db.orders.where('customerId').equals(customerId).toArray()
  },
  
  async getOrder(id: string) {
    return await db.orders.get(id)
  },
  
  async addOrder(order: Omit<Order, 'id' | 'createdAt'>) {
    const id = Date.now().toString()
    const newOrder: Order = {
      ...order,
      id,
      createdAt: new Date()
    }
    await db.orders.add(newOrder)
    return newOrder
  },
  
  async updateOrder(id: string, updates: { gallons?: number; date?: Date }) {
    const order = await db.orders.get(id)
    if (order) {
      const updatedOrder = {
        ...order,
        ...updates
      }
      await db.orders.update(id, updatedOrder)
      return updatedOrder
    }
    return null
  },
  
  async deleteOrder(id: string) {
    await db.orders.delete(id)
  },
  
  async getDailyTotal() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const orders = await db.orders
      .where('date')
      .aboveOrEqual(today)
      .toArray()
    
    return orders.reduce((total, order) => total + order.gallons, 0)
  },
  
  async getMonthlyTotal() {
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    const orders = await db.orders
      .where('date')
      .aboveOrEqual(firstDayOfMonth)
      .toArray()
    
    return orders.reduce((total, order) => total + order.gallons, 0)
  },
  
  async searchCustomers(query: string) {
    if (!query.trim()) return await this.getAllCustomers()
    
    const lowercaseQuery = query.toLowerCase()
    
    const customers = await db.customers
      .filter(customer => 
        customer.name.toLowerCase().includes(lowercaseQuery) ||
        customer.address.toLowerCase().includes(lowercaseQuery)
      )
      .toArray()
    
    return customers
  },
  
  async getCustomersWithOrders() {
    const customers = await this.getAllCustomers()
    const orders = await db.orders.toArray()
    
    return customers.map(customer => ({
      ...customer,
      orders: orders.filter(order => order.customerId === customer.id)
    }))
  },
  
  // Sample data 
  async initializeSampleData() {
    const count = await db.customers.count()
    
    if (count === 0) {
      const sampleCustomers = [
        {
          name: 'Jo Kitahara',
          address: 'BLK 1 LOT 4, Kasamatsu'
        },
        {
          name: 'Jane Doe',
          address: 'BLK 3 LOT 5, Somewhere'
        }
      ]
      
      for (const customer of sampleCustomers) {
        const newCustomer = await this.addCustomer(customer)
        
        // Add sample orders
        await this.addOrder({
          customerId: newCustomer.id,
          gallons: Math.floor(Math.random() * 100) + 20,
          date: new Date()
        })
        
        await this.addOrder({
          customerId: newCustomer.id,
          gallons: Math.floor(Math.random() * 100) + 20,
          date: new Date(Date.now() - 86400000) // Yesterday
        })
      }
    }
  }
}