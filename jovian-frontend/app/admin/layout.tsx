import type React from "react"
import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin/admin-nav"
import { AdminHeader } from "@/components/admin/admin-header"
import { isAdmin } from "@/lib/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is an admin with the ADMIN role
  const isAdminUser = await isAdmin()

  // If not admin, redirect to access denied page
  if (!isAdminUser) {
    redirect("/access-denied")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <AdminNav />
        </aside>
        <main className="relative py-6 md:gap-10">{children}</main>
      </div>
    </div>
  )
}
