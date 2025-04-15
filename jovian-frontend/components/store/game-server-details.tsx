import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Server, MemoryStickIcon as Memory, HardDrive, Globe, Shield, Users } from "lucide-react"
import { getGameServerById } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddToCartButton } from "./add-to-cart-button"
import { notFound } from "next/navigation"

interface GameServerDetailsProps {
  serverId: string
}

export async function GameServerDetails({ serverId }: GameServerDetailsProps) {
  const server = await getGameServerById(serverId)

  if (!server) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/store"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Store
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-lg border">
          <Image
            src={server.imageUrl || `/placeholder.svg?height=400&width=600`}
            alt={server.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{server.name}</h1>
              <Badge variant="secondary">{server.category}</Badge>
            </div>
            <p className="text-xl font-bold text-emerald-500">${server.price}/month</p>
          </div>

          <p className="text-muted-foreground">{server.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-emerald-500" />
              <span>{server.specs.cpu}</span>
            </div>
            <div className="flex items-center gap-2">
              <Memory className="h-5 w-5 text-emerald-500" />
              <span>{server.specs.memory}</span>
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-emerald-500" />
              <span>{server.specs.storage}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-500" />
              <span>{server.region}</span>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-4 sm:flex-row">
            <AddToCartButton server={server} />
            <Button variant="outline">Configure Server</Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4 pt-4">
          <h3 className="text-lg font-medium">Server Details</h3>
          <p>
            {server.fullDescription ||
              `This ${server.name} server provides a high-performance gaming experience with 
              dedicated resources and low latency. Perfect for both casual and competitive gameplay.`}
          </p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>Instant deployment - your server will be ready in minutes</li>
            <li>Full administrative access and control panel</li>
            <li>Automatic backups and easy restoration</li>
            <li>One-click mod installation and updates</li>
            <li>DDoS protection included at no extra cost</li>
          </ul>
        </TabsContent>
        <TabsContent value="features" className="space-y-4 pt-4">
          <h3 className="text-lg font-medium">Key Features</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <Shield className="mt-0.5 h-5 w-5 text-emerald-500" />
              <div>
                <h4 className="font-medium">DDoS Protection</h4>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade protection against DDoS attacks to keep your server online.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Server className="mt-0.5 h-5 w-5 text-emerald-500" />
              <div>
                <h4 className="font-medium">High Performance</h4>
                <p className="text-sm text-muted-foreground">
                  Powered by the latest hardware for smooth gameplay and low latency.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="mt-0.5 h-5 w-5 text-emerald-500" />
              <div>
                <h4 className="font-medium">Global Network</h4>
                <p className="text-sm text-muted-foreground">
                  Servers in multiple regions for the best possible connection.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users className="mt-0.5 h-5 w-5 text-emerald-500" />
              <div>
                <h4 className="font-medium">Mod Support</h4>
                <p className="text-sm text-muted-foreground">
                  Easy installation of mods and plugins for your favorite games.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="requirements" className="space-y-4 pt-4">
          <h3 className="text-lg font-medium">System Requirements</h3>
          <p>To connect to this server, you'll need the following:</p>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Game Client</h4>
              <p className="text-sm text-muted-foreground">
                A legitimate copy of {server.category} installed on your computer.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Internet Connection</h4>
              <p className="text-sm text-muted-foreground">
                A stable internet connection with at least 5 Mbps download and 1 Mbps upload.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Recommended Hardware</h4>
              <p className="text-sm text-muted-foreground">
                For optimal gameplay, we recommend a computer with at least 8GB RAM, a modern CPU, and a dedicated
                graphics card.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
