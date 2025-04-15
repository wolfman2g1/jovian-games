"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RefreshCw, Plus, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const servers = [
  {
    id: "1",
    name: "Minecraft Survival",
    game: "Minecraft",
    status: "online",
    players: "12/20",
    region: "US East",
    ip: "mc1.joviangame.com:25565",
  },
  {
    id: "2",
    name: "CS:GO Competitive",
    game: "Counter-Strike: Global Offensive",
    status: "online",
    players: "8/10",
    region: "EU West",
    ip: "cs1.joviangame.com:27015",
  },
  {
    id: "3",
    name: "Valheim Vikings",
    game: "Valheim",
    status: "offline",
    players: "0/10",
    region: "US West",
    ip: "valheim1.joviangame.com:2456",
  },
]

export function ServerList() {
  const [serverList, setServerList] = useState(servers)

  const toggleServerStatus = (id: string) => {
    setServerList(
      serverList.map((server) => {
        if (server.id === id) {
          return {
            ...server,
            status: server.status === "online" ? "offline" : "online",
            players: server.status === "online" ? "0/10" : server.players,
          }
        }
        return server
      }),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            All
          </Button>
          <Button variant="outline" size="sm">
            Online
          </Button>
          <Button variant="outline" size="sm">
            Offline
          </Button>
        </div>
        <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="mr-2 h-4 w-4" /> New Server
        </Button>
      </div>
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium">Server Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Game</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Players</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Region</th>
                <th className="h-12 px-4 text-left align-middle font-medium">IP Address</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {serverList.map((server) => (
                <tr
                  key={server.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle">{server.name}</td>
                  <td className="p-4 align-middle">{server.game}</td>
                  <td className="p-4 align-middle">
                    <Badge
                      variant={server.status === "online" ? "success" : "destructive"}
                      className={server.status === "online" ? "bg-emerald-500 hover:bg-emerald-600" : undefined}
                    >
                      {server.status}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle">{server.players}</td>
                  <td className="p-4 align-middle">{server.region}</td>
                  <td className="p-4 align-middle">{server.ip}</td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleServerStatus(server.id)}>
                        {server.status === "online" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit Server</DropdownMenuItem>
                          <DropdownMenuItem>View Console</DropdownMenuItem>
                          <DropdownMenuItem>Backup Server</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Server</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}