import Link from "next/link"
import { Button } from "@/components/ui/button"

export function GameServerHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                Jovian Game Server Hosting
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Deploy your game server in seconds. Scale on demand. Pay only for what you use.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/games">
                <Button size="lg" variant="outline">
                  View Games
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative h-full w-full overflow-hidden rounded-lg border bg-background p-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 opacity-50"></div>
              <div className="relative h-full w-full overflow-hidden rounded-md bg-black/80 p-4">
                <div className="flex h-full flex-col">
                  <div className="flex h-6 items-center border-b border-zinc-800 pb-1">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 text-xs text-zinc-400">server-console.sh</div>
                  </div>
                  <div className="flex-1 pt-4">
                    <div className="text-xs text-emerald-400">$ ./start-server.sh</div>
                    <div className="mt-2 text-xs text-zinc-100">Initializing game server...</div>
                    <div className="mt-1 text-xs text-zinc-100">Loading configuration...</div>
                    <div className="mt-1 text-xs text-zinc-100">Starting server on port 27015...</div>
                    <div className="mt-1 text-xs text-emerald-400">Server started successfully!</div>
                    <div className="mt-1 text-xs text-zinc-100">Waiting for players to connect...</div>
                    <div className="mt-4 text-xs text-emerald-400 animate-pulse">▋</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
