import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="mx-auto max-w-md text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-emerald-500" />
        <h1 className="mt-6 text-3xl font-bold">Payment Successful!</h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for your purchase. Your game server is being set up and will be ready shortly.
        </p>
        <div className="mt-8 space-y-4">
          <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/store">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
