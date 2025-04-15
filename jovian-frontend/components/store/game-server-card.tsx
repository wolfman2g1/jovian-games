import Image from "next/image"
import Link from "next/link"
import type { GameServer } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "./add-to-cart-button"

interface GameServerCardProps {
  server: GameServer
}

export function GameServerCard({ server }: GameServerCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={server.imageUrl || `/placeholder.svg?height=192&width=384`}
            alt={server.name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/80">
              {server.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{server.name}</h3>
            <span className="font-bold text-emerald-500">${server.price}/mo</span>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{server.description}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
              {server.specs.cpu}
            </Badge>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
              {server.specs.memory}
            </Badge>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
              {server.specs.storage}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <Link href={`/store/${server.id}`} className="text-sm font-medium text-emerald-500 hover:underline">
          View Details
        </Link>
        <AddToCartButton server={server} />
      </CardFooter>
    </Card>
  )
}
