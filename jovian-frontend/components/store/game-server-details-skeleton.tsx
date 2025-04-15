import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export function GameServerDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-6 w-24" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Skeleton className="aspect-video w-full rounded-lg" />

        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-7 w-24" />
          </div>

          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />

          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4 flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />

          <div className="space-y-2 pl-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-[90%]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
