import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Minecraft Server Restarted</p>
          <p className="text-sm text-muted-foreground">Automatic restart completed successfully</p>
        </div>
        <div className="ml-auto font-medium text-sm">Just now</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Player JohnDoe joined</p>
          <p className="text-sm text-muted-foreground">Minecraft server</p>
        </div>
        <div className="ml-auto font-medium text-sm">2h ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>VL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Valheim server updated</p>
          <p className="text-sm text-muted-foreground">Updated to version 0.217.14</p>
        </div>
        <div className="ml-auto font-medium text-sm">5h ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">CS:GO server created</p>
          <p className="text-sm text-muted-foreground">New server deployed successfully</p>
        </div>
        <div className="ml-auto font-medium text-sm">1d ago</div>
      </div>
    </div>
  )
}