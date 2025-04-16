import type { Metadata } from "next"
import { isAuthenticated } from "@/lib/auth"
import { redirect } from "next/navigation"
import { GameServerList } from "@/components/dashboard/game-server-list"

export const metadata: Metadata = {
  title: "Dashboard | Jovian Game",
  description: "Manage your game servers",
}

export default async function DashboardPage() {
  // Check if user is authenticated
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect("/auth/login")
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Game Servers</h1>
      </div>

      <GameServerList />
    </div>
  )
}
