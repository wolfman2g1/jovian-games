import { GameForm } from "@/components/admin/game-form"

export default function NewGamePage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Add New Game</h2>
      </div>
      <GameForm />
    </div>
  )
}
