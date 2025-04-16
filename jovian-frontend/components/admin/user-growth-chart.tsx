"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"

const data = [
  {
    name: "Jan",
    newUsers: 120,
    activeUsers: 800,
  },
  {
    name: "Feb",
    newUsers: 140,
    activeUsers: 920,
  },
  {
    name: "Mar",
    newUsers: 210,
    activeUsers: 1100,
  },
  {
    name: "Apr",
    newUsers: 180,
    activeUsers: 1250,
  },
  {
    name: "May",
    newUsers: 220,
    activeUsers: 1400,
  },
  {
    name: "Jun",
    newUsers: 250,
    activeUsers: 1600,
  },
  {
    name: "Jul",
    newUsers: 280,
    activeUsers: 1800,
  },
  {
    name: "Aug",
    newUsers: 310,
    activeUsers: 2000,
  },
  {
    name: "Sep",
    newUsers: 290,
    activeUsers: 2200,
  },
  {
    name: "Oct",
    newUsers: 320,
    activeUsers: 2350,
  },
  {
    name: "Nov",
    newUsers: 280,
    activeUsers: 2400,
  },
  {
    name: "Dec",
    newUsers: 250,
    activeUsers: 2350,
  },
]

interface UserGrowthChartProps {
  detailed?: boolean
}

export function UserGrowthChart({ detailed = false }: UserGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={detailed ? 500 : 350}>
      <LineChart data={data}>
        {detailed && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="activeUsers"
          name="Active Users"
          stroke="#10b981"
          strokeWidth={2}
          dot={detailed}
        />
        <Line type="monotone" dataKey="newUsers" name="New Users" stroke="#0ea5e9" strokeWidth={2} dot={detailed} />
      </LineChart>
    </ResponsiveContainer>
  )
}
