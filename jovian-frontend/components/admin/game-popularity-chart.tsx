"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"

const data = [
  {
    name: "Minecraft",
    servers: 245,
  },
  {
    name: "CS:GO",
    servers: 189,
  },
  {
    name: "Valheim",
    servers: 120,
  },
  {
    name: "ARK",
    servers: 98,
  },
  {
    name: "Rust",
    servers: 156,
  },
  {
    name: "Terraria",
    servers: 67,
  },
]

interface GamePopularityChartProps {
  detailed?: boolean
}

export function GamePopularityChart({ detailed = false }: GamePopularityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={detailed ? 500 : 350}>
      <BarChart data={data} layout="vertical">
        {detailed && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="servers" name="Active Servers" fill="#10b981" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
