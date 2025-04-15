import type React from "react"
import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { isAuthenticated } from "@/lib/auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated
  const authenticated = await isAuthenticated()

  // If not authenticated, redirect to login page
  if (!authenticated) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <DashboardNav />
          <UserNav />
        </div>
      </header>
      <main className="flex-1 container py-6">{children}</main>
    </div>
  )
}
