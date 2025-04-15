"use server"

import type { GameServer } from "./types"

// Mock data for game servers
const gameServers: GameServer[] = [
  {
    id: "minecraft-basic",
    name: "Minecraft Basic Server",
    description: "Perfect for small communities and casual gameplay.",
    price: 9.99,
    category: "Minecraft",
    region: "US East",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Minecraft",
    specs: {
      cpu: "2 vCPU",
      memory: "2GB RAM",
      storage: "20GB SSD",
      bandwidth: "Unlimited",
    },
  },
  {
    id: "minecraft-premium",
    name: "Minecraft Premium Server",
    description: "Ideal for medium-sized communities with mods.",
    price: 19.99,
    category: "Minecraft",
    region: "US East",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Minecraft+Premium",
    specs: {
      cpu: "4 vCPU",
      memory: "4GB RAM",
      storage: "50GB SSD",
      bandwidth: "Unlimited",
    },
  },
  {
    id: "csgo-competitive",
    name: "CS:GO Competitive Server",
    description: "High-performance server for competitive matches.",
    price: 14.99,
    category: "CS:GO",
    region: "EU West",
    imageUrl: "/placeholder.svg?height=400&width=600&text=CS:GO",
    specs: {
      cpu: "4 vCPU",
      memory: "8GB RAM",
      storage: "30GB SSD",
      bandwidth: "Unlimited",
    },
  },
  {
    id: "valheim-standard",
    name: "Valheim Standard Server",
    description: "Explore and build with friends in this Viking survival game.",
    price: 12.99,
    category: "Valheim",
    region: "US West",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Valheim",
    specs: {
      cpu: "2 vCPU",
      memory: "4GB RAM",
      storage: "20GB SSD",
      bandwidth: "Unlimited",
    },
  },
  {
    id: "ark-survival",
    name: "ARK: Survival Evolved",
    description: "Tame dinosaurs and build bases in this survival game.",
    price: 24.99,
    category: "ARK",
    region: "EU Central",
    imageUrl: "/placeholder.svg?height=400&width=600&text=ARK",
    specs: {
      cpu: "6 vCPU",
      memory: "12GB RAM",
      storage: "100GB SSD",
      bandwidth: "Unlimited",
    },
  },
  {
    id: "rust-performance",
    name: "Rust Performance Server",
    description: "High-performance server for the ultimate survival experience.",
    price: 29.99,
    category: "Rust",
    region: "Asia Pacific",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Rust",
    specs: {
      cpu: "8 vCPU",
      memory: "16GB RAM",
      storage: "150GB SSD",
      bandwidth: "Unlimited",
    },
  },
]

// Function to get all game servers
export async function getGameServers(): Promise<GameServer[]> {
  // In a real app, this would fetch from your NestJS backend
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return gameServers
}

// Function to get a game server by ID
export async function getGameServerById(id: string): Promise<GameServer | undefined> {
  // In a real app, this would fetch from your NestJS backend
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return gameServers.find((server) => server.id === id)
}

// Function to get related game servers
export async function getRelatedServers(currentId: string, category: string): Promise<GameServer[]> {
  // In a real app, this would fetch from your NestJS backend
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400))
  return gameServers.filter((server) => server.id !== currentId && server.category === category).slice(0, 4)
}
