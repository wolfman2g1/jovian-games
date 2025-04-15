"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { GamepadIcon as GameController } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <GameController className="h-6 w-6 text-emerald-500" />
        <span className="hidden font-bold sm:inline-block">Jovian Game</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/store"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/store" || pathname.startsWith("/store/") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Store
        </Link>
        <Link
          href="/games"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/games" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Games
        </Link>
        <Link
          href="/pricing"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/pricing" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Pricing
        </Link>
        <Link
          href="/features"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/features" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Features
        </Link>
        <Link
          href="/docs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/docs" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Docs
        </Link>
      </nav>
    </div>
  )
}
