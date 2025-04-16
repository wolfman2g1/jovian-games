"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "US East", value: 35 },
  { name: "US West", value: 25 },
  { name: "EU West", value: 20 },
  { name: "EU Central", value: 15 },
  { name: "Asia Pacific", value: 5 },
]

const COLORS = ["#10b981", "#0ea5e9", "#8b5cf6", "#f59e0b", "#ef4444"]

interface ServerUsageChartProps {
  detailed?: boolean
}

export function ServerUsageChart({ detailed = false }: ServerUsageChartProps) {
  return (
    <ResponsiveContainer width="100%" height={detailed ? 500 : 350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={detailed ? 180 : 120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, "Server Usage"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
