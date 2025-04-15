import { getGameServers } from "@/lib/store"
import { GameServerCard } from "./game-server-card"

export async function GameServerGrid() {
  // Fetch game servers from the backend
  const gameServers = await getGameServers()

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {gameServers.map((server) => (
        <GameServerCard key={server.id} server={server} />
      ))}
    </div>
  )
}
