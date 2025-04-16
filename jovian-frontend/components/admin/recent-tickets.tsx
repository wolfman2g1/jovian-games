import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

const tickets = [
  {
    id: "TICKET-1234",
    subject: "Server connection issues",
    status: "open",
    priority: "high",
    customer: "John Doe",
    created: "2 hours ago",
  },
  {
    id: "TICKET-1235",
    subject: "Billing question about subscription",
    status: "open",
    priority: "medium",
    customer: "Sarah Miller",
    created: "5 hours ago",
  },
  {
    id: "TICKET-1236",
    subject: "Game server performance issues",
    status: "in-progress",
    priority: "high",
    customer: "Robert Johnson",
    created: "1 day ago",
  },
  {
    id: "TICKET-1237",
    subject: "Request for new game support",
    status: "open",
    priority: "low",
    customer: "Emily Wilson",
    created: "2 days ago",
  },
  {
    id: "TICKET-1238",
    subject: "Account access problem",
    status: "in-progress",
    priority: "medium",
    customer: "Michael Brown",
    created: "3 days ago",
  },
]

export function RecentTickets() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ticket</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Created</TableHead>
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
                  ticket.status === "open" ? "destructive" : ticket.status === "in-progress" ? "outline" : "default"
                }
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
            <TableCell>{ticket.created}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/admin/tickets/${ticket.id}`}>View</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
