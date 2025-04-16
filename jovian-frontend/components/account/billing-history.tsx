"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, CreditCard, Plus } from "lucide-react"
import { toast } from "sonner"

// Mock billing history data
const billingHistory = [
  {
    id: "INV-001",
    date: "2023-04-01",
    amount: 24.99,
    status: "paid",
    description: "Pro Plan - Monthly",
  },
  {
    id: "INV-002",
    date: "2023-03-01",
    amount: 24.99,
    status: "paid",
    description: "Pro Plan - Monthly",
  },
  {
    id: "INV-003",
    date: "2023-02-01",
    amount: 24.99,
    status: "paid",
    description: "Pro Plan - Monthly",
  },
  {
    id: "INV-004",
    date: "2023-01-01",
    amount: 24.99,
    status: "paid",
    description: "Pro Plan - Monthly",
  },
]

// Mock payment methods
const paymentMethods = [
  {
    id: "pm_1",
    type: "card",
    last4: "4242",
    expMonth: 12,
    expYear: 2024,
    brand: "Visa",
    isDefault: true,
  },
]

export function BillingHistory({ user }: { user: any }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success("Invoice downloaded", {
      description: `Invoice ${invoiceId} has been downloaded.`,
    })
  }

  const handleAddPaymentMethod = () => {
    toast.info("Coming soon", {
      description: "This feature is not yet implemented.",
    })
  }

  const handleMakeDefault = (paymentMethodId: string) => {
    toast.success("Default payment method updated", {
      description: "Your default payment method has been updated.",
    })
  }

  const handleRemovePaymentMethod = (paymentMethodId: string) => {
    toast.success("Payment method removed", {
      description: "Your payment method has been removed.",
    })
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>Manage your billing information and view your invoice history.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Payment Methods</h3>
            <Button variant="outline" size="sm" onClick={handleAddPaymentMethod}>
              <Plus className="mr-2 h-4 w-4" />
              Add payment method
            </Button>
          </div>

          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-muted p-2">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">
                    {method.brand} •••• {method.last4}
                    {method.isDefault && (
                      <Badge variant="outline" className="ml-2">
                        Default
                      </Badge>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Expires {method.expMonth}/{method.expYear}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {!method.isDefault && (
                  <Button variant="ghost" size="sm" onClick={() => handleMakeDefault(method.id)}>
                    Make default
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => handleRemovePaymentMethod(method.id)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Billing History</h3>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingHistory.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={invoice.status === "paid" ? "default" : "destructive"}
                        className={invoice.status === "paid" ? "bg-emerald-500" : undefined}
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDownloadInvoice(invoice.id)}>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Subscription</h3>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Pro Plan</p>
                <p className="text-sm text-muted-foreground">$24.99 per month</p>
              </div>
              <Button variant="outline">Manage Subscription</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )
}
