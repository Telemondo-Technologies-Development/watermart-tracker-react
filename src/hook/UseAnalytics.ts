import { useState, useEffect } from 'react'
import { databaseService, type Order } from '../lib/Database'
import { db } from '../lib/Database'

interface AnalyticsData {
  totalCustomers: number
  totalOrders: number
  averageOrder: number
  totalGallons: number
}

interface TimeRangeData {
  start: Date
  end: Date
}

export function useAnalytics(timeRange: '7days' | '30days' | 'thisMonth' | 'lastMonth') {
  const [data, setData] = useState<AnalyticsData>({
    totalCustomers: 0,
    totalOrders: 0,
    averageOrder: 0,
    totalGallons: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true)
      
      try {
        // Get date range based on selection
        const range = getDateRange(timeRange)
        
        // Get all customers
        const customers = await databaseService.getAllCustomers()
        
        // Use db to get all orders
        const allOrders = await db.orders.toArray()
        
        // Filter orders by date range
        const filteredOrders = allOrders.filter(
          (order: Order) => order.date >= range.start && order.date <= range.end
        )
        
        // Calculate metrics
        const totalGallons = filteredOrders.reduce((sum: number, order: Order) => sum + order.gallons, 0)
        const totalOrders = filteredOrders.length
        const averageOrder = totalOrders > 0 ? totalGallons / totalOrders : 0
        
        setData({
          totalCustomers: customers.length,
          totalOrders,
          averageOrder: parseFloat(averageOrder.toFixed(1)),
          totalGallons,
        })
      } catch (error) {
        console.error('Failed to load analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadAnalytics()
  }, [timeRange])

  return { data, isLoading }
}

// To get date range
function getDateRange(timeRange: '7days' | '30days' | 'thisMonth' | 'lastMonth'): TimeRangeData {
  const now = new Date()
  const start = new Date()
  
  switch (timeRange) {
    case '7days': {
      start.setDate(now.getDate() - 7)
      start.setHours(0, 0, 0, 0)
      break
    }
      
    case '30days': {
      start.setDate(now.getDate() - 30)
      start.setHours(0, 0, 0, 0)
      break
    }
      
    case 'thisMonth': {
      start.setDate(1)
      start.setHours(0, 0, 0, 0)
      break
    }
      
    case 'lastMonth': {
      start.setMonth(now.getMonth() - 1)
      start.setDate(1)
      start.setHours(0, 0, 0, 0)
      const endLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      endLastMonth.setHours(23, 59, 59, 999)
      return { start, end: endLastMonth }
    }
  }
  
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  
  return { start, end }
}