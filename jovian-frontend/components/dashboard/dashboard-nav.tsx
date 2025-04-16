"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { GamepadIcon as GameController, Server, CreditCard, Settings, BarChart, Users, User } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart,
  },
  {
    title: "Servers",
    href: "/dashboard/servers",
    icon: Server,
  },
  {
    title: "Games",
    href: "/dashboard/games",
    icon: GameController,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Account",
    href: "/dashboard/account",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-between w-full">
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <Link href="/" className="hidden items-center space-x-2 md:flex">
          <GameController className="h-6 w-6 text-emerald-500" />
          <span className="font-bold">Jovian Game</span>
        </Link>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span className="hidden md:inline-block">{item.title}</span>
          </Link>
        ))}
      </nav>
      <ModeToggle />
    </div>
  )
}
