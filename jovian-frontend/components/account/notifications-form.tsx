"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const notificationsFormSchema = z.object({
  marketing_email: z.boolean().default(false),
  security_email: z.boolean().default(true),
  server_status: z.boolean().default(true),
  maintenance_alerts: z.boolean().default(true),
  billing_email: z.boolean().default(true),
  new_features: z.boolean().default(false),
  tips_tricks: z.boolean().default(false),
  discord_notifications: z.boolean().default(false),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

export function NotificationsForm({ user }: { user: any }) {
  const [isLoading, setIsLoading] = useState(false)

  // Default values populated from the user object or with sensible defaults
  const defaultValues: Partial<NotificationsFormValues> = {
    marketing_email: user?.notifications?.marketing_email || false,
    security_email: user?.notifications?.security_email !== false, // Default to true
    server_status: user?.notifications?.server_status !== false, // Default to true
    maintenance_alerts: user?.notifications?.maintenance_alerts !== false, // Default to true
    billing_email: user?.notifications?.billing_email !== false, // Default to true
    new_features: user?.notifications?.new_features || false,
    tips_tricks: user?.notifications?.tips_tricks || false,
    discord_notifications: user?.notifications?.discord_notifications || false,
  }

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  })

  async function onSubmit(data: NotificationsFormValues) {
    setIsLoading(true)

    try {
      // In a real app, you would call your API here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Notification preferences updated", {
        description: "Your notification preferences have been updated successfully.",
      })
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Your notification preferences could not be updated. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how you receive notifications and updates.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-medium">Email Notifications</h3>

              <FormField
                control={form.control}
                name="security_email"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Security alerts</FormLabel>
                      <FormDescription>Receive emails about security updates and account activity.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="server_status"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Server status</FormLabel>
                      <FormDescription>Get notified when your servers go offline or come back online.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maintenance_alerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Maintenance alerts</FormLabel>
                      <FormDescription>Receive notifications about scheduled maintenance.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billing_email"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Billing updates</FormLabel>
                      <FormDescription>Receive emails about your invoices and billing status.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Marketing & Updates</h3>

              <FormField
                control={form.control}
                name="marketing_email"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Marketing emails</FormLabel>
                      <FormDescription>
                        Receive emails about new products, features, and special offers.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="new_features"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">New features</FormLabel>
                      <FormDescription>Get notified when we launch new features or updates.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tips_tricks"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Tips & tricks</FormLabel>
                      <FormDescription>
                        Receive emails with tips to get the most out of your game servers.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Other Notifications</h3>

              <FormField
                control={form.control}
                name="discord_notifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Discord notifications</FormLabel>
                      <FormDescription>Receive notifications via Discord for important alerts.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save preferences"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  )
}
