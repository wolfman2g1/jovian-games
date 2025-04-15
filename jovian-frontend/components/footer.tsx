import Link from "next/link"
import { GamepadIcon as GameController } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <GameController className="h-6 w-6 text-emerald-500" />
          <span className="font-bold">Jovian Game</span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="/contact" className="text-xs hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Jovian Game. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
