"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

const securityFormSchema = z
  .object({
    current_password: z.string().min(1, {
      message: "Current password is required.",
    }),
    new_password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirm_password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    two_factor: z.boolean().default(false),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })

type SecurityFormValues = z.infer<typeof securityFormSchema>

export function SecurityForm({ user }: { user: any }) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
      two_factor: user?.two_factor || false,
    },
  })

  async function onSubmit(data: SecurityFormValues) {
    setIsLoading(true)

    try {
      // In a real app, you would call your API here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Password updated", {
        description: "Your password has been updated successfully.",
      })

      // Reset form fields except two_factor
      form.reset({
        current_password: "",
        new_password: "",
        confirm_password: "",
        two_factor: data.two_factor,
      })
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Your password could not be updated. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleTwoFactorChange(checked: boolean) {
    try {
      // In a real app, you would call your API here
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast.success(checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled", {
        description: checked ? "Your account is now more secure." : "Two-factor authentication has been disabled.",
      })
    } catch (error) {
      form.setValue("two_factor", !checked) // Revert the change
      toast.error("Something went wrong", {
        description: "Two-factor authentication settings could not be updated.",
      })
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Update your password and manage account security settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>Password must be at least 8 characters long.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update password"}
            </Button>
          </form>
        </Form>

        <div className="space-y-4">
          <div className="border-t pt-4">
            <h3 className="font-medium">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Two-factor authentication</h4>
              <p className="text-sm text-muted-foreground">Protect your account with an authentication app.</p>
            </div>
            <Switch
              checked={form.watch("two_factor")}
              onCheckedChange={(checked) => {
                form.setValue("two_factor", checked)
                handleTwoFactorChange(checked)
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Active sessions</h4>
              <p className="text-sm text-muted-foreground">Manage your active sessions on different devices.</p>
            </div>
            <Button variant="outline">Manage</Button>
          </div>
        </div>
      </CardContent>
    </>
  )
}
