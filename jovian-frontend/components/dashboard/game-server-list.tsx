"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Server } from "lucide-react"

// Mock data for game servers
const mockServers = [
  {
    id: "1",
    name: "Minecraft Server",
    game: "Minecraft",
    status: "online",
    players: "12/20",
    region: "US East",
    ip: "mc1.jovian.game",
    port: "25565",
  },
  {
    id: "2",
    name: "CS:GO Competitive",
    game: "Counter-Strike: Global Offensive",
    status: "offline",
    players: "0/16",
    region: "Europe",
    ip: "cs1.jovian.game",
    port: "27015",
  },
]

export function GameServerList() {
  const [servers] = useState(mockServers)

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Active Servers</h2>
        <Button asChild>
          <Link href="/store">
            <Plus className="mr-2 h-4 w-4" />
            Rent New Server
          </Link>
        </Button>
      </div>

      {servers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Server className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Servers Found</h3>
            <p className="text-muted-foreground">You don't have any active game servers.</p>
            <Button className="mt-4" asChild>
              <Link href="/store">
                <Plus className="mr-2 h-4 w-4" />
                Rent Your First Server
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {servers.map((server) => (
            <Card key={server.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{server.name}</CardTitle>
                  <Badge variant={server.status === "online" ? "success" : "destructive"}>{server.status}</Badge>
                </div>
                <CardDescription>{server.game}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Players:</span>
                    <span>{server.players}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span>{server.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IP:Port:</span>
                    <span>
                      {server.ip}:{server.port}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/servers/${server.id}`}>Manage</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link href={`/dashboard/servers/${server.id}/console`}>Console</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
