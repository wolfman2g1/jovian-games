"use client"

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"

const data = [
  {
    name: "Jan",
    total: 2400,
    recurring: 1800,
    oneTime: 600,
  },
  {
    name: "Feb",
    total: 1398,
    recurring: 1000,
    oneTime: 398,
  },
  {
    name: "Mar",
    total: 9800,
    recurring: 7500,
    oneTime: 2300,
  },
  {
    name: "Apr",
    total: 3908,
    recurring: 2800,
    oneTime: 1108,
  },
  {
    name: "May",
    total: 4800,
    recurring: 3600,
    oneTime: 1200,
  },
  {
    name: "Jun",
    total: 3800,
    recurring: 2900,
    oneTime: 900,
  },
  {
    name: "Jul",
    total: 4300,
    recurring: 3200,
    oneTime: 1100,
  },
  {
    name: "Aug",
    total: 5300,
    recurring: 4100,
    oneTime: 1200,
  },
  {
    name: "Sep",
    total: 4900,
    recurring: 3700,
    oneTime: 1200,
  },
  {
    name: "Oct",
    total: 6300,
    recurring: 4800,
    oneTime: 1500,
  },
  {
    name: "Nov",
    total: 5400,
    recurring: 4100,
    oneTime: 1300,
  },
  {
    name: "Dec",
    total: 7800,
    recurring: 5900,
    oneTime: 1900,
  },
]

interface RevenueChartProps {
  detailed?: boolean
}

export function RevenueChart({ detailed = false }: RevenueChartProps) {
  if (detailed) {
    return (
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
          <Legend />
          <Line type="monotone" dataKey="total" name="Total Revenue" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="recurring" name="Recurring Revenue" stroke="#0ea5e9" />
          <Line type="monotone" dataKey="oneTime" name="One-time Revenue" stroke="#8b5cf6" />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} labelFormatter={(label) => `Month: ${label}`} />
        <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
