import { Suspense } from "react"
import type { Metadata } from "next"
import { GameServerGrid } from "@/components/store/game-server-grid"
import { GameServerSkeleton } from "@/components/store/game-server-skeleton"
import { GameFilters } from "@/components/store/game-filters"
import { CartSheet } from "@/components/store/cart-sheet"

export const metadata: Metadata = {
  title: "Game Server Store - Jovian Game",
  description: "Browse and rent game servers for your favorite games",
}

export default function StorePage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Game Server Store</h1>
          <p className="text-muted-foreground">Browse and rent game servers for your favorite games</p>
        </div>
        <CartSheet />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <div>
          <GameFilters />
        </div>
        <div>
          <Suspense fallback={<GameServerSkeleton />}>
            <GameServerGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
