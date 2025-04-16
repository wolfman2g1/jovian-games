import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { ProfileForm } from "@/components/account/profile-form"
import { SecurityForm } from "@/components/account/security-form"
import { NotificationsForm } from "@/components/account/notifications-form"
import { BillingHistory } from "@/components/account/billing-history"
import { getCurrentUser } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Account - Jovian Game",
  description: "Manage your account settings and preferences",
}

export default async function AccountPage() {
  const user = await getCurrentUser()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Account</h2>
        <p className="text-muted-foreground">Manage your account settings and set email preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <ProfileForm user={user} />
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <SecurityForm user={user} />
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <NotificationsForm user={user} />
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <BillingHistory user={user} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
