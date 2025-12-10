import { useState, useEffect } from "react"
import { SalesCards } from "./components/SalesCards"
import { SearchBar } from "./components/SearchBar"
import { CustomerList } from "./components/CustomerList"
import { AddCustomerModal } from "./components/AddCustomerModal"
import { CustomerDetailsModal } from "./components/CustomerDetailsModal"
import { Sidebar } from "./components/Sidebar"
import { useDatabase } from "./hook/UseDatabase"
import type { Customer } from "./types"

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light-blue to-white">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="spinner mb-6"></div>
          <p>Loading database...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light-blue to-white">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h2 className="text-error mb-4">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => refreshCustomers()}
            className="btn btn-primary mt-6"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-blue to-white flex">
      <Sidebar isVisible={showSidebar} onClose={() => setShowSidebar(false)} />
      
      <header className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-br from-primary-blue to-dark-blue text-white flex items-center px-8 z-50 shadow-custom">
        <button 
          className="bg-transparent border-none text-white text-2xl cursor-pointer p-2 rounded mr-6 hover:bg-white/10 transition-colors duration-200"
          onClick={() => setShowSidebar(!showSidebar)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div className="flex-1 flex flex-col items-end">
          <h1 className="text-2xl mb-1 font-bold tracking-tight">Watermart Tracker</h1>
        </div>
      </header>

      <main className="flex-1 mt-20 p-8 flex justify-center">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
          <div className="flex flex-col">
            <div className="bg-white rounded-xl p-8 shadow-card mt-0 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl text-very-dark font-semibold">Customers ({customers.length})</h2>
                <button 
                  className="btn btn-primary" 
                  onClick={() => setShowAddModal(true)}
                >
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

          <div className="lg:sticky lg:top-28 h-fit">
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