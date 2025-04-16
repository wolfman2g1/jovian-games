"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { getAllCategories, getAllDevelopers, getAllGenres, createGame, updateGame } from "@/lib/actions/game-actions"
import { ImageUploader } from "@/components/admin/image-uploader"
import type { Category, Developer, Genre, Game } from "@/types"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Game name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  cpu: z.coerce.number().int().min(1, {
    message: "CPU cores must be at least 1.",
  }),
  ram: z.coerce.number().int().min(1, {
    message: "RAM must be at least 1 GB.",
  }),
  price: z.coerce.number().min(0, {
    message: "Price must be a positive number.",
  }),
  categoryId: z.string({
    required_error: "Please select a category.",
  }),
  developerId: z.string({
    required_error: "Please select a developer.",
  }),
  genreId: z.string({
    required_error: "Please select a genre.",
  }),
  imageUrl: z.string().optional(),
})

export function GameForm({ game }: { game?: Game }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const router = useRouter()

  // Fetch categories, developers, and genres on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesData, developersData, genresData] = await Promise.all([
          getAllCategories(),
          getAllDevelopers(),
          getAllGenres(),
        ])

        setCategories(categoriesData)
        setDevelopers(developersData)
        setGenres(genresData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load form data", {
          description: "Please try again or contact support.",
        })
      } finally {
        setIsDataLoading(false)
      }
    }

    fetchData()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: game?.name || "",
      description: game?.description || "",
      cpu: game?.cpu || 1,
      ram: game?.ram || 1,
      price: game?.price || 0,
      categoryId: game?.categoryId || "",
      developerId: game?.developerId || "",
      genreId: game?.genreId || "",
      imageUrl: game?.imageUrl || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      if (game?.id) {
        // Update existing game
        await updateGame(game.id, values)
        toast.success("Game updated!", {
          description: `${values.name} has been updated successfully.`,
        })
      } else {
        // Create new game
        await createGame(values)
        toast.success("Game created!", {
          description: `${values.name} has been added to the catalog.`,
        })
      }

      router.push("/admin/games")
    } catch (error) {
      console.error("Error saving game:", error)
      toast.error("Something went wrong", {
        description: "The game could not be saved. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isDataLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading form data...</span>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Minecraft" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cpu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPU Cores</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="1" {...field} />
                        </FormControl>
                        <FormDescription>Number of CPU cores required</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RAM (GB)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="1" {...field} />
                        </FormControl>
                        <FormDescription>Amount of RAM in GB</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" placeholder="9.99" {...field} />
                      </FormControl>
                      <FormDescription>Price in USD</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <SelectItem key={category.id} value={category.id!}>
                                {category.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No categories available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="developerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Developer</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a developer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {developers.length > 0 ? (
                            developers.map((developer) => (
                              <SelectItem key={developer.id} value={developer.id!}>
                                {developer.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No developers available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genreId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a genre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {genres.length > 0 ? (
                            genres.map((genre) => (
                              <SelectItem key={genre.id} value={genre.id!}>
                                {genre.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No genres available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game Icon</FormLabel>
                      <FormControl>
                        <ImageUploader
                          value={field.value || ""}
                          onChange={field.onChange}
                          onRemove={() => field.onChange("")}
                        />
                      </FormControl>
                      <FormDescription>Upload a square icon for the game. Recommended size: 256x256px.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief description of the game..."
                          className="min-h-[250px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/games")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {game ? "Updating..." : "Creating..."}
              </>
            ) : game ? (
              "Update Game"
            ) : (
              "Add Game"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
