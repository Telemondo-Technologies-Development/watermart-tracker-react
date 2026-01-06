import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { WaterDropIcon } from '@/components/ui/water-icons'
import { Droplets } from 'lucide-react'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleLogin = (values: LoginFormValues) => {
    // Simple hardcoded authentication
    if (values.username === 'admin' && values.password === 'admin123') {
      // Store auth state
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('username', values.username)
      
      // Navigate to home
      navigate({ to: '/' })
    } else {
      setError('Invalid username or password')
      form.setError('password', {
        type: 'manual',
        message: 'Invalid credentials',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-blue via-accent-cyan to-light-blue flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-blue to-accent-cyan rounded-full blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-primary-blue to-accent-cyan p-4 rounded-full">
                <Droplets className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-blue to-accent-cyan bg-clip-text text-transparent mb-2">
            Watermart Tracker
          </h1>
          <p className="text-dark-gray text-sm">Water Gallon Order Tracker</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-very-dark mb-2 flex items-center gap-2">
              <WaterDropIcon className="w-6 h-6 text-primary-blue" />
              Welcome Admin
            </h2>
            <p className="text-dark-gray text-sm">Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/30 rounded-lg">
              <p className="text-error text-sm font-medium">{error}</p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        autoComplete="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="water"
                size="lg"
                className="w-full mt-6"
                isLoading={form.formState.isSubmitting}
              >
                Sign In
              </Button>
            </form>
          </Form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/80 text-sm">
          <p>© 2025 Watermart Tracker. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}