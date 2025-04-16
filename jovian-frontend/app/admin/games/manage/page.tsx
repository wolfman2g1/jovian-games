import type { Metadata } from "next"
import { isAdmin } from "@/lib/auth"
import { redirect } from "next/navigation"
import { CategoryManager } from "@/components/admin/category-manager"
import { DeveloperManager } from "@/components/admin/developer-manager"
import { GenreManager } from "@/components/admin/genre-manager"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Manage Game Data | Admin",
  description: "Manage game categories, developers, and genres",
}

export default async function ManageGameDataPage() {
  // Check if user is admin
  const admin = await isAdmin()

  if (!admin) {
    redirect("/access-denied")
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Game Data</h1>
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="developers">Developers</TabsTrigger>
          <TabsTrigger value="genres">Genres</TabsTrigger>
        </TabsList>
        <TabsContent value="categories" className="mt-6">
          <CategoryManager />
        </TabsContent>
        <TabsContent value="developers" className="mt-6">
          <DeveloperManager />
        </TabsContent>
        <TabsContent value="genres" className="mt-6">
          <GenreManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
