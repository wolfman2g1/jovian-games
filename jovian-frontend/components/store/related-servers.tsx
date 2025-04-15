import { getRelatedServers } from "@/lib/store"
import { GameServerCard } from "./game-server-card"

interface RelatedServersProps {
  currentServerId: string
  category: string
}

export async function RelatedServers({ currentServerId, category }: RelatedServersProps) {
  const relatedServers = await getRelatedServers(currentServerId, category)

  if (relatedServers.length === 0) {
    return <p className="text-muted-foreground">No related servers found.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {relatedServers.map((server) => (
        <GameServerCard key={server.id} server={server} />
      ))}
    </div>
  )
}
