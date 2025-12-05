import { db } from './Database'

export async function exportDatabase() {
  const customers = await db.customers.toArray()
  const orders = await db.orders.toArray()
  
  const data = {
    customers,
    orders,
    exportedAt: new Date().toISOString(),
    version: '1.0'
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `watermart-backup-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  
  URL.revokeObjectURL(url)
}

export async function importDatabase(file: File): Promise<boolean> {
  try {
    const text = await file.text()
    const data = JSON.parse(text)
    
    // Validate
    if (!data.customers || !data.orders) {
      throw new Error('Invalid backup file format')
    }
    
    await db.transaction('rw', db.customers, db.orders, async () => {
      await db.customers.clear()
      await db.orders.clear()
      
      await db.customers.bulkAdd(data.customers)
      await db.orders.bulkAdd(data.orders)
    })
    
    return true
  } catch (error) {
    console.error('Failed to import database:', error)
    return false
  }
}