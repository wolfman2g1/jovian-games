"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Mon",
    players: 12,
    cpu: 30,
  },
  {
    name: "Tue",
    players: 18,
    cpu: 42,
  },
  {
    name: "Wed",
    players: 24,
    cpu: 51,
  },
  {
    name: "Thu",
    players: 32,
    cpu: 60,
  },
  {
    name: "Fri",
    players: 48,
    cpu: 75,
  },
  {
    name: "Sat",
    players: 56,
    cpu: 82,
  },
  {
    name: "Sun",
    players: 42,
    cpu: 65,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="players" fill="#10b981" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar dataKey="cpu" fill="#0ea5e9" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
