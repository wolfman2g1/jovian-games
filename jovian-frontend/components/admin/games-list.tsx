"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search } from "lucide-react"
import Link from "next/link"

const games = [
  {
    id: "1",
    name: "Minecraft",
    category: "Sandbox",
    servers: 245,
    status: "active",
    lastUpdated: "2023-09-15",
  },
  {
    id: "2",
    name: "Counter-Strike: Global Offensive",
    category: "FPS",
    servers: 189,
    status: "active",
    lastUpdated: "2023-09-10",
  },
  {
    id: "3",
    name: "Valheim",
    category: "Survival",
    servers: 120,
    status: "active",
    lastUpdated: "2023-09-05",
  },
  {
    id: "4",
    name: "ARK: Survival Evolved",
    category: "Survival",
    servers: 98,
    status: "active",
    lastUpdated: "2023-08-28",
  },
  {
    id: "5",
    name: "Rust",
    category: "Survival",
    servers: 156,
    status: "active",
    lastUpdated: "2023-08-20",
  },
  {
    id: "6",
    name: "Terraria",
    category: "Sandbox",
    servers: 67,
    status: "active",
    lastUpdated: "2023-08-15",
  },
  {
    id: "7",
    name: "Team Fortress 2",
    category: "FPS",
    servers: 45,
    status: "inactive",
    lastUpdated: "2023-07-30",
  },
]

export function GamesList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredGames = games.filter(
    (game) =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Active Servers</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGames.map((game) => (
              <TableRow key={game.id}>
                <TableCell className="font-medium">{game.name}</TableCell>
                <TableCell>{game.category}</TableCell>
                <TableCell>{game.servers}</TableCell>
                <TableCell>
                  <Badge
                    variant={game.status === "active" ? "default" : "secondary"}
                    className={game.status === "active" ? "bg-emerald-500" : ""}
                  >
                    {game.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{game.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/games/${game.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/games/${game.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
