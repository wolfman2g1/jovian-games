import { SubmitTicketForm } from "@/components/support/submit-ticket-form"
import { UserTicketsList } from "@/components/support/user-tickets-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupportPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
        <p className="text-muted-foreground">
          Need help with your game server? Our support team is here to assist you.
        </p>
      </div>

      <Tabs defaultValue="tickets" className="mt-8">
        <TabsList>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="new">Submit New Ticket</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="mt-4">
          <UserTicketsList />
        </TabsContent>

        <TabsContent value="new" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
              <CardDescription>Please provide as much detail as possible so we can help you quickly.</CardDescription>
            </CardHeader>
            <CardContent>
              <SubmitTicketForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions about our game server hosting services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">How do I connect to my game server?</h3>
                  <p className="text-muted-foreground">
                    You can connect to your game server using the IP address and port provided in your dashboard. Each
                    game has a different connection method, which is detailed in our game-specific guides.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">How do I install mods on my server?</h3>
                  <p className="text-muted-foreground">
                    You can install mods through our control panel. Navigate to your server dashboard, select the "Mods"
                    tab, and follow the instructions for your specific game.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">
                    We accept credit/debit cards, PayPal, and various cryptocurrency options. All payments are processed
                    securely through our payment providers.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">How do I upgrade my server?</h3>
                  <p className="text-muted-foreground">
                    You can upgrade your server at any time from your dashboard. Go to your server settings, select
                    "Upgrade," and choose your new plan. The upgrade will be applied immediately.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">What is your refund policy?</h3>
                  <p className="text-muted-foreground">
                    We offer a 48-hour money-back guarantee for new customers. If you're not satisfied with our service,
                    you can request a refund within 48 hours of your initial purchase.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
