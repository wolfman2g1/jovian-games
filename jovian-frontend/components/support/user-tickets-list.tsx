"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock user tickets data
const userTickets = [
  {
    id: "TICKET-1234",
    subject: "Server connection issues",
    status: "open",
    priority: "high",
    created: "2 hours ago",
    lastUpdated: "1 hour ago",
  },
  {
    id: "TICKET-1240",
    subject: "Billing question about subscription",
    status: "in-progress",
    priority: "medium",
    created: "2 days ago",
    lastUpdated: "1 day ago",
  },
  {
    id: "TICKET-1245",
    subject: "How to install mods on my server",
    status: "closed",
    priority: "low",
    created: "1 week ago",
    lastUpdated: "5 days ago",
  },
]

export function UserTicketsList() {
  const [tickets] = useState(userTickets)

  if (tickets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Tickets Found</CardTitle>
          <CardDescription>You haven't submitted any support tickets yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/support?tab=new">Submit Your First Ticket</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Support Tickets</CardTitle>
        <CardDescription>View and manage your support tickets.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ticket.status === "open"
                          ? "destructive"
                          : ticket.status === "in-progress"
                            ? "outline"
                            : "default"
                      }
                      className={ticket.status === "closed" ? "bg-green-500" : undefined}
                    >
                      {ticket.status === "open"
                        ? "Open"
                        : ticket.status === "in-progress"
                          ? 'In Progress"gress'
                          : "Closed"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        ticket.priority === "high"
                          ? "border-red-500 text-red-500"
                          : ticket.priority === "medium"
                            ? "border-yellow-500 text-yellow-500"
                            : "border-green-500 text-green-500"
                      }
                    >
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.created}</TableCell>
                  <TableCell>{ticket.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/support/tickets/${ticket.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
