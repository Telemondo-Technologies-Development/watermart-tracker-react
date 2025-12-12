import { useState, useEffect, useCallback } from 'react'
import { databaseService, type Customer as DBCustomer } from '../lib/Database'
import type { Customer, Order } from '../types'

export function useDatabase() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Convert database customer to app customer
  const dbToAppCustomer = async (dbCustomer: DBCustomer): Promise<Customer> => {
    const orders = await databaseService.getCustomerOrders(dbCustomer.id)
    const appOrders: Order[] = orders.map(order => ({
      id: order.id,
      gallons: order.gallons,
      date: order.date
    }))
    
    return {
      id: dbCustomer.id,
      name: dbCustomer.name,
      address: dbCustomer.address,
      orders: appOrders
    }
  }

  // Load all customers with their orders
  const loadCustomers = useCallback(async () => {
    try {
      setIsLoading(true)
      const dbCustomers = await databaseService.getAllCustomers()
      
      const appCustomers = await Promise.all(
        dbCustomers.map(dbToAppCustomer)
      )
      
      setCustomers(appCustomers)
      setError(null)
    } catch (err) {
      setError('Failed to load customers')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initialize database and load data
  useEffect(() => {
    const initialize = async () => {
      try {
        // Optional: Initialize with sample data if empty
        await databaseService.initializeSampleData()
        await loadCustomers()
      } catch (err) {
        setError('Failed to initialize database')
        console.error(err)
      }
    }
    
    initialize()
  }, [loadCustomers])

  // Add a new customer
  const addCustomer = async (name: string, address: string, initialGallons: number) => {
    try {
      const newCustomer = await databaseService.addCustomer({ name, address })
      
      if (initialGallons > 0) {
        await databaseService.addOrder({
          customerId: newCustomer.id,
          gallons: initialGallons,
          date: new Date()
        })
      }
      
      await loadCustomers()
      return newCustomer
    } catch (err) {
      console.error('Failed to add customer:', err)
      throw err
    }
  }

  // Add order to existing customer
  const addOrder = async (customerId: string, gallons: number) => {
    try {
      await databaseService.addOrder({
        customerId,
        gallons,
        date: new Date()
      })
      
      await loadCustomers()
    } catch (err) {
      console.error('Failed to add order:', err)
      throw err
    }
  }

  // Update customer information
  const updateCustomer = async (customerId: string, updates: { name?: string; address?: string }) => {
    try {
      await databaseService.updateCustomer(customerId, updates)
      await loadCustomers()
    } catch (err) {
      console.error('Failed to update customer:', err)
      throw err
    }
  }

  // Delete customer
  const deleteCustomer = async (customerId: string) => {
    try {
      await databaseService.deleteCustomer(customerId)
      await loadCustomers()
    } catch (err) {
      console.error('Failed to delete customer:', err)
      throw err
    }
  }

  // Search customers
  const searchCustomers = async (query: string): Promise<Customer[]> => {
    try {
      const dbCustomers = await databaseService.searchCustomers(query)
      return await Promise.all(dbCustomers.map(dbToAppCustomer))
    } catch (err) {
      console.error('Failed to search customers:', err)
      return []
    }
  }

  // Get sales totals
  const getTodayTotal = async (): Promise<number> => {
    try {
      return await databaseService.getDailyTotal()
    } catch (err) {
      console.error('Failed to get daily total:', err)
      return 0
    }
  }

  const getMonthlyTotal = async (): Promise<number> => {
    try {
      return await databaseService.getMonthlyTotal()
    } catch (err) {
      console.error('Failed to get monthly total:', err)
      return 0
    }
  }

  return {
    customers,
    isLoading,
    error,
    addCustomer,
    addOrder,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    getTodayTotal,
    getMonthlyTotal,
    refreshCustomers: loadCustomers
  }
}