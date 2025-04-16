"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getAllGenres, createGenre, updateGenre, deleteGenre } from "@/lib/actions/game-actions"
import type { Genre } from "@/types"

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Genre name must be at least 2 characters.",
  }),
})

export function GenreManager() {
  const [genres, setGenres] = useState<Genre[]>([])
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  // Initialize edit form
  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  // Fetch genres on component mount
  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await getAllGenres()
        setGenres(data)
      } catch (error) {
        toast.error("Failed to load genres", {
          description: "Please try again later or contact support.",
        })
        console.error("Error fetching genres:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGenres()
  }, [])

  // Form submission handler for adding
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const newGenre = await createGenre({ name: values.name })
      setGenres([...genres, newGenre])
      toast.success(`Genre "${values.name}" added successfully`)
      form.reset()
      setIsAddDialogOpen(false)
    } catch (error) {
      toast.error("Failed to add genre", {
        description: "Please try again later or contact support.",
      })
      console.error("Error adding genre:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Form submission handler for editing
  async function onEditSubmit(values: z.infer<typeof formSchema>) {
    if (!editingGenre?.id) return

    setIsSubmitting(true)
    try {
      const updatedGenre = await updateGenre(editingGenre.id, { name: values.name })

      setGenres(genres.map((genre) => (genre.id === editingGenre.id ? updatedGenre : genre)))

      toast.success(`Genre updated successfully`)
      editForm.reset()
      setIsEditDialogOpen(false)
      setEditingGenre(null)
    } catch (error) {
      toast.error("Failed to update genre", {
        description: "Please try again later or contact support.",
      })
      console.error("Error updating genre:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Delete genre handler
  async function handleDeleteGenre(id: string) {
    setIsDeleting(true)
    try {
      await deleteGenre(id)
      setGenres(genres.filter((genre) => genre.id !== id))
      toast.success("Genre deleted successfully")
    } catch (error) {
      toast.error("Failed to delete genre", {
        description: "Please try again later or contact support.",
      })
      console.error("Error deleting genre:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  // Edit genre handler
  function startEditing(genre: Genre) {
    setEditingGenre(genre)
    editForm.setValue("name", genre.name)
    setIsEditDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Game Genres</CardTitle>
          <CardDescription>Manage the genres for your games</CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Genre
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Genre</DialogTitle>
              <DialogDescription>Create a new game genre. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter genre name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Genre"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : genres.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No genres found. Add your first genre to get started.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {genres.map((genre) => (
                <TableRow key={genre.id}>
                  <TableCell>{genre.name}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => startEditing(genre)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the genre "{genre.name}". This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteGenre(genre.id!)} disabled={isDeleting}>
                            {isDeleting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              "Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Genre</DialogTitle>
            <DialogDescription>Update the genre name. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter genre name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
