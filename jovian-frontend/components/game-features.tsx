import { Shield, Cpu, Zap, Globe, Clock, Users } from "lucide-react"

export function GameFeatures() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-emerald-500/10 px-3 py-1 text-sm text-emerald-500">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need for your game server
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools and features you need to run your game server smoothly.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Shield className="h-12 w-12 text-emerald-500" />
            <h3 className="text-xl font-bold">DDoS Protection</h3>
            <p className="text-center text-muted-foreground">
              Enterprise-grade protection against DDoS attacks to keep your server online.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Cpu className="h-12 w-12 text-emerald-500" />
            <h3 className="text-xl font-bold">High Performance</h3>
            <p className="text-center text-muted-foreground">
              Powered by the latest hardware for smooth gameplay and low latency.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Zap className="h-12 w-12 text-emerald-500" />
            <h3 className="text-xl font-bold">One-Click Setup</h3>
            <p className="text-center text-muted-foreground">
              Deploy your server in seconds with our easy-to-use control panel.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Globe className="h-12 w-12 text-emerald-500" />
            <h3 className="text-xl font-bold">Global Network</h3>
            <p className="text-center text-muted-foreground">
              Servers in multiple regions for the best possible connection.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Clock className="h-12 w-12 text-emerald-500" />
            <h3 className="text-xl font-bold">24/7 Uptime</h3>
            <p className="text-center text-muted-foreground">
              Guaranteed uptime with automatic backups and monitoring.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Users className="h-12 w-12 text-emerald-500" />
            <h3 className="text-xl font-bold">Mod Support</h3>
            <p className="text-center text-muted-foreground">
              Easy installation of mods and plugins for your favorite games.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
