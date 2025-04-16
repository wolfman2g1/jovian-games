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
import { getAllDevelopers, createDeveloper, updateDeveloper, deleteDeveloper } from "@/lib/actions/game-actions"
import type { Developer } from "@/types"

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Developer name must be at least 2 characters.",
  }),
})

export function DeveloperManager() {
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(null)
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

  // Fetch developers on component mount
  useEffect(() => {
    async function fetchDevelopers() {
      try {
        const data = await getAllDevelopers()
        setDevelopers(data)
      } catch (error) {
        toast.error("Failed to load developers", {
          description: "Please try again later or contact support.",
        })
        console.error("Error fetching developers:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDevelopers()
  }, [])

  // Form submission handler for adding
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const newDeveloper = await createDeveloper({ name: values.name })
      setDevelopers([...developers, newDeveloper])
      toast.success(`Developer "${values.name}" added successfully`)
      form.reset()
      setIsAddDialogOpen(false)
    } catch (error) {
      toast.error("Failed to add developer", {
        description: "Please try again later or contact support.",
      })
      console.error("Error adding developer:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Form submission handler for editing
  async function onEditSubmit(values: z.infer<typeof formSchema>) {
    if (!editingDeveloper?.id) return

    setIsSubmitting(true)
    try {
      const updatedDeveloper = await updateDeveloper(editingDeveloper.id, { name: values.name })

      setDevelopers(
        developers.map((developer) => (developer.id === editingDeveloper.id ? updatedDeveloper : developer)),
      )

      toast.success(`Developer updated successfully`)
      editForm.reset()
      setIsEditDialogOpen(false)
      setEditingDeveloper(null)
    } catch (error) {
      toast.error("Failed to update developer", {
        description: "Please try again later or contact support.",
      })
      console.error("Error updating developer:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Delete developer handler
  async function handleDeleteDeveloper(id: string) {
    setIsDeleting(true)
    try {
      await deleteDeveloper(id)
      setDevelopers(developers.filter((developer) => developer.id !== id))
      toast.success("Developer deleted successfully")
    } catch (error) {
      toast.error("Failed to delete developer", {
        description: "Please try again later or contact support.",
      })
      console.error("Error deleting developer:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  // Edit developer handler
  function startEditing(developer: Developer) {
    setEditingDeveloper(developer)
    editForm.setValue("name", developer.name)
    setIsEditDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Game Developers</CardTitle>
          <CardDescription>Manage the developers for your games</CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Developer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Developer</DialogTitle>
              <DialogDescription>Create a new game developer. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Developer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter developer name" {...field} />
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
                      "Save Developer"
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
        ) : developers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No developers found. Add your first developer to get started.</p>
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
              {developers.map((developer) => (
                <TableRow key={developer.id}>
                  <TableCell>{developer.name}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => startEditing(developer)}>
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
                            This will permanently delete the developer "{developer.name}". This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteDeveloper(developer.id!)} disabled={isDeleting}>
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
            <DialogTitle>Edit Developer</DialogTitle>
            <DialogDescription>Update the developer name. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Developer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter developer name" {...field} />
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
