import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const navigate = useNavigate()

  useEffect(() => {
    // Check authentication on mount and route changes
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    const currentPath = window.location.pathname

    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated && currentPath !== '/login') {
      navigate({ to: '/login' })
    }

    // If authenticated and on login page, redirect to home
    if (isAuthenticated && currentPath === '/login') {
      navigate({ to: '/' })
    }
  }, [navigate])

  return (
    <>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  )
}