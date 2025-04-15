import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/dashboard/user-nav"
import { GamepadIcon, ShieldAlert } from "lucide-react"
import { MobileNav } from "@/components/admin/mobile-nav"
import { Badge } from "@/components/ui/badge"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/admin" className="flex items-center gap-2">
            <GamepadIcon className="h-6 w-6 text-emerald-500" />
            <span className="hidden font-bold md:inline-block">Jovian Game Admin</span>
            <Badge variant="outline" className="ml-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500">
              <ShieldAlert className="mr-1 h-3 w-3" />
              ADMIN AREA
            </Badge>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            View Site
          </Link>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

