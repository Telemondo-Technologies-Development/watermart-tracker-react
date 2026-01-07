import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useEffect } from 'react'

// Helper function to check authentication
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true'
}

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: ({ location }) => {
    const authenticated = isAuthenticated()
    const isLoginPage = location.pathname === '/login'

    // If not authenticated and trying to access protected pages
    if (!authenticated && !isLoginPage) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
      })
    }

    // If already authenticated and trying to access login page
    if (authenticated && isLoginPage) {
      throw redirect({
        to: '/',
      })
    }
  },
})

function RootComponent() {
  // Simple effect to handle real-time auth changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isAuthenticated') {
        // Reload the page if auth state changes
        window.location.reload()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  )
}