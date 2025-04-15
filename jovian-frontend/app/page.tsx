import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { GameServerHero } from "@/components/game-server-hero"
import { GameFeatures } from "@/components/game-features"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <ModeToggle />
            <nav className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign up</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <GameServerHero />
        <GameFeatures />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
