import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { GamesList } from "@/components/admin/games-list"
import Link from "next/link"

export default function GamesPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Games Management</h2>
        <Button asChild>
          <Link href="/admin/games/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Game
          </Link>
        </Button>
      </div>
      <GamesList />
    </div>
  )
}
