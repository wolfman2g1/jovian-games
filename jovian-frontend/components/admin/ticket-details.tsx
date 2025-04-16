"use client"

import Link from "next/link"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

// Mock ticket data - in a real app, this would come from your API
const ticketData = {
  "TICKET-1234": {
    id: "TICKET-1234",
    subject: "Server connection issues",
    status: "open",
    priority: "high",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/placeholder.svg",
    },
    created: "2023-09-20T14:30:00Z",
    lastUpdated: "2023-09-20T15:30:00Z",
    assignedTo: "Support Team",
    description:
      "I'm having trouble connecting to my Minecraft server. It was working fine yesterday, but today I keep getting a connection timeout error. I've tried restarting the server multiple times but it's not helping.",
    messages: [
      {
        id: "msg-1",
        sender: "John Doe",
        isCustomer: true,
        content:
          "I'm having trouble connecting to my Minecraft server. It was working fine yesterday, but today I keep getting a connection timeout error. I've tried restarting the server multiple times but it's not helping.",
        timestamp: "2023-09-20T14:30:00Z",
      },
      {
        id: "msg-2",
        sender: "Support Agent",
        isCustomer: false,
        content:
          "Hello John, I'm sorry to hear you're having connection issues. Let me check the server status for you. Could you please provide your server ID or IP address?",
        timestamp: "2023-09-20T15:00:00Z",
      },
      {
        id: "msg-3",
        sender: "John Doe",
        isCustomer: true,
        content: "Sure, the server ID is MC-12345. The IP is mc12345.joviangame.com",
        timestamp: "2023-09-20T15:15:00Z",
      },
      {
        id: "msg-4",
        sender: "Support Agent",
        isCustomer: false,
        content:
          "Thank you for providing that information. I can see that your server is currently showing as online in our system, but there might be an issue with the network configuration. Let me try a few things to resolve this for you.",
        timestamp: "2023-09-20T15:30:00Z",
      },
    ],
  },
  // Add more tickets as needed
}

interface TicketDetailsProps {
  id: string
}

export function TicketDetails({ id }: TicketDetailsProps) {
  const [ticket, setTicket] = useState(ticketData[id as keyof typeof ticketData] || null)
  const [newMessage, setNewMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!ticket) {
    return <div>Ticket not found</div>
  }

  const handleStatusChange = (status: string) => {
    setTicket({
      ...ticket,
      status,
      lastUpdated: new Date().toISOString(),
    })

    toast.success("Ticket status updated", {
      description: `Ticket status changed to ${status}`,
    })
  }

  const handlePriorityChange = (priority: string) => {
    setTicket({
      ...ticket,
      priority,
      lastUpdated: new Date().toISOString(),
    })

    toast.success("Ticket priority updated", {
      description: `Ticket priority changed to ${priority}`,
    })
  }

  const handleAssigneeChange = (assignedTo: string) => {
    setTicket({
      ...ticket,
      assignedTo,
      lastUpdated: new Date().toISOString(),
    })

    toast.success("Ticket assignee updated", {
      description: `Ticket assigned to ${assignedTo}`,
    })
  }

  const handleSubmitReply = () => {
    if (!newMessage.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const updatedTicket = {
        ...ticket,
        lastUpdated: new Date().toISOString(),
        messages: [
          ...ticket.messages,
          {
            id: `msg-${ticket.messages.length + 1}`,
            sender: "Support Agent",
            isCustomer: false,
            content: newMessage,
            timestamp: new Date().toISOString(),
          },
        ],
      }

      setTicket(updatedTicket)
      setNewMessage("")
      setIsSubmitting(false)

      toast.success("Reply sent", {
        description: "Your reply has been sent to the customer",
      })
    }, 1000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="space-y-6 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{ticket.subject}</CardTitle>
            <CardDescription>
              Opened by {ticket.customer.name} on {formatDate(ticket.created)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {ticket.messages.map((message) => (
                <div key={message.id} className={`flex gap-4 ${message.isCustomer ? "" : "flex-row-reverse"}`}>
                  <Avatar>
                    <AvatarImage
                      src={message.isCustomer ? ticket.customer.avatar : "/placeholder.svg"}
                      alt={message.sender}
                    />
                    <AvatarFallback>
                      {message.isCustomer
                        ? ticket.customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "SA"}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex max-w-[80%] flex-col gap-2 ${message.isCustomer ? "" : "items-end"}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{message.sender}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(message.timestamp)}</span>
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.isCustomer ? "bg-muted" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-col gap-4">
              <Textarea
                placeholder="Type your reply..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-32"
              />
              <Button onClick={handleSubmitReply} disabled={isSubmitting || !newMessage.trim()} className="ml-auto">
                {isSubmitting ? "Sending..." : "Send Reply"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ticket Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Status</h4>
                <Select value={ticket.status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Priority</h4>
                <Select value={ticket.priority} onValueChange={handlePriorityChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Assigned To</h4>
                <Select value={ticket.assignedTo} onValueChange={handleAssigneeChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Support Team">Support Team</SelectItem>
                    <SelectItem value="Technical Team">Technical Team</SelectItem>
                    <SelectItem value="Billing Team">Billing Team</SelectItem>
                    <SelectItem value="Product Team">Product Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Customer</h4>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={ticket.customer.avatar || "/placeholder.svg"} alt={ticket.customer.name} />
                    <AvatarFallback>
                      {ticket.customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{ticket.customer.name}</p>
                    <p className="text-xs text-muted-foreground">{ticket.customer.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Created</h4>
                <p className="text-sm">{formatDate(ticket.created)}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Last Updated</h4>
                <p className="text-sm">{formatDate(ticket.lastUpdated)}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/admin/users/${ticket.customer.email}`}>View Customer Profile</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Add Internal Note
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Escalate Ticket
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Merge with Another Ticket
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              Close Ticket
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
