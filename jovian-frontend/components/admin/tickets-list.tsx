"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const tickets = [
  {
    id: "TICKET-1234",
    subject: "Server connection issues",
    status: "open",
    priority: "high",
    customer: "John Doe",
    created: "2 hours ago",
    lastUpdated: "1 hour ago",
    assignedTo: "Support Team",
  },
  {
    id: "TICKET-1235",
    subject: "Billing question about subscription",
    status: "open",
    priority: "medium",
    customer: "Sarah Miller",
    created: "5 hours ago",
    lastUpdated: "3 hours ago",
    assignedTo: "Billing Team",
  },
  {
    id: "TICKET-1236",
    subject: "Game server performance issues",
    status: "in-progress",
    priority: "high",
    customer: "Robert Johnson",
    created: "1 day ago",
    lastUpdated: "10 hours ago",
    assignedTo: "Technical Team",
  },
  {
    id: "TICKET-1237",
    subject: "Request for new game support",
    status: "open",
    priority: "low",
    customer: "Emily Wilson",
    created: "2 days ago",
    lastUpdated: "1 day ago",
    assignedTo: "Product Team",
  },
  {
    id: "TICKET-1238",
    subject: "Account access problem",
    status: "in-progress",
    priority: "medium",
    customer: "Michael Brown",
    created: "3 days ago",
    lastUpdated: "2 days ago",
    assignedTo: "Support Team",
  },
  {
    id: "TICKET-1239",
    subject: "Server migration request",
    status: "closed",
    priority: "medium",
    customer: "David Lee",
    created: "5 days ago",
    lastUpdated: "4 days ago",
    assignedTo: "Technical Team",
  },
  {
    id: "TICKET-1240",
    subject: "Plugin compatibility issue",
    status: "closed",
    priority: "low",
    customer: "Jennifer Taylor",
    created: "1 week ago",
    lastUpdated: "6 days ago",
    assignedTo: "Support Team",
  },
]

export function TicketsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ticket.status === "open" ? "destructive" : ticket.status === "in-progress" ? "outline" : "default"
                    }
                    className={ticket.status === "closed" ? "bg-green-500" : undefined}
                  >
                    {ticket.status === "open" ? "Open" : ticket.status === "in-progress" ? "In Progress" : "Closed"}
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
                <TableCell>{ticket.customer}</TableCell>
                <TableCell>{ticket.assignedTo}</TableCell>
                <TableCell>{ticket.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/tickets/${ticket.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
