import { TicketsList } from "@/components/admin/tickets-list"

export default function TicketsPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Support Tickets</h2>
      </div>
      <TicketsList />
    </div>
  )
}
