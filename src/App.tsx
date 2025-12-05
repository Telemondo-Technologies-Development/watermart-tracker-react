import { useState, useEffect } from "react"
import { SalesCards } from "./components/SalesCards"
import { SearchBar } from "./components/SearchBar"
import { CustomerList } from "./components/CustomerList"
import { AddCustomerModal } from "./components/AddCustomerModal"
import { CustomerDetailsModal } from "./components/CustomerDetailsModal"
import { Sidebar } from "./components/Sidebar"
import { useDatabase } from "./hook/UseDatabase"
import type { Customer } from "./types"
import "./App.css"

export default function App() {
  const {
    customers,
    isLoading,
    error,
    addCustomer,
    addOrder,
    updateCustomer,
    searchCustomers,
    getTodayTotal,
    getMonthlyTotal,
    refreshCustomers
  } = useDatabase()

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [dailyTotal, setDailyTotal] = useState(0)
  const [monthlyTotal, setMonthlyTotal] = useState(0)

  useEffect(() => {
    const loadTotals = async () => {
      const [daily, monthly] = await Promise.all([
        getTodayTotal(),
        getMonthlyTotal()
      ])
      setDailyTotal(daily)
      setMonthlyTotal(monthly)
    }
    
    loadTotals()
    const interval = setInterval(loadTotals, 60000)
    return () => clearInterval(interval)
  }, [getTodayTotal, getMonthlyTotal])

  // Filter customers using search query
  useEffect(() => {
    const filter = async () => {
      if (!searchQuery.trim()) {
        setFilteredCustomers(customers)
      } else {
        const results = await searchCustomers(searchQuery)
        setFilteredCustomers(results)
      }
    }
    
    filter()
  }, [searchQuery, customers, searchCustomers])

  const handleAddCustomer = async (name: string, address: string, gallons: number) => {
    try {
      await addCustomer(name, address, gallons)
      setShowAddModal(false)
    } catch (err) {
      console.error("Failed to add customer:", err)
    }
  }

  const handleAddOrder = async (gallons: number) => {
    if (!selectedCustomer) return
    
    try {
      await addOrder(selectedCustomer.id, gallons)
    } catch (err) {
      console.error("Failed to add order:", err)
    }
  }

  const handleEditCustomer = async (name: string, address: string) => {
    if (!selectedCustomer) return
    
    try {
      await updateCustomer(selectedCustomer.id, { name, address })
    } catch (err) {
      console.error("Failed to edit customer:", err)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading database...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="app-container">
        <div className="error-state">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => refreshCustomers()}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <Sidebar isVisible={showSidebar} onClose={() => setShowSidebar(false)} />
      
      <header className="header">
        <button 
          className="menu-btn" 
          onClick={() => setShowSidebar(!showSidebar)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div className="header-content">
          <h1>Watermart Tracker</h1>
        </div>
      </header>

      <main className="main-content">
        <div className="content-wrapper">
          <div className="left-section" aria-label="Customer List">
            <div className="list-section">
              <div className="section-header">
                <h2>Customers ({customers.length})</h2>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                  + Add Customer
                </button>
              </div>

              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

              <CustomerList
                customers={filteredCustomers}
                onSelectCustomer={(customer) => {
                  setSelectedCustomer(customer)
                  setShowDetailsModal(true)
                }}
              />
            </div>
          </div>

          <div className="right-section">
            <SalesCards dailyTotal={dailyTotal} monthlyTotal={monthlyTotal} />
          </div>
        </div>
      </main>

      {showAddModal && <AddCustomerModal onAdd={handleAddCustomer} onClose={() => setShowAddModal(false)} />}

      {showDetailsModal && selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onAddOrder={handleAddOrder}
          onEditCustomer={handleEditCustomer}
          onClose={() => {
            setShowDetailsModal(false)
            setSelectedCustomer(null)
          }}
        />
      )}
    </div>
  )
}