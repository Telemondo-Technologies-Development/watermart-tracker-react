import { createFileRoute } from '@tanstack/react-router'
import { SalesReport } from '@/components/SalesReport'

export const Route = createFileRoute('/sales-report')({
  component: SalesReportPage,
})

function SalesReportPage() {
  return <SalesReport />
}