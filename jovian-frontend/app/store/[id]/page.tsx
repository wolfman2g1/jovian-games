import { Suspense } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getGameServerById } from "@/lib/store"
import { GameServerDetails } from "@/components/store/game-server-details"
import { GameServerDetailsSkeleton } from "@/components/store/game-server-details-skeleton"
import { RelatedServers } from "@/components/store/related-servers"

interface GameServerPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: GameServerPageProps): Promise<Metadata> {
  const server = await getGameServerById(params.id)

  if (!server) {
    return {
      title: "Server Not Found - Jovian Game",
    }
  }

  return {
    title: `${server.name} - Jovian Game`,
    description: server.description,
  }
}

export default async function GameServerPage({ params }: GameServerPageProps) {
  const server = await getGameServerById(params.id)

  if (!server) {
    notFound()
  }

  return (
    <div className="container py-8">
      <Suspense fallback={<GameServerDetailsSkeleton />}>
        <GameServerDetails serverId={params.id} />
      </Suspense>

      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Related Servers</h2>
        <Suspense>
          <RelatedServers currentServerId={params.id} category={server.category} />
        </Suspense>
      </div>
    </div>
  )
}
