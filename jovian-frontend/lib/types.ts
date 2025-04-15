export interface GameServer {
  id: string
  name: string
  description: string
  fullDescription?: string
  price: number
  category: string
  region: string
  imageUrl?: string
  specs: {
    cpu: string
    memory: string
    storage: string
    bandwidth?: string
  }
}

export interface CartItem {
  id: string
  serverId: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

export interface Cart {
  id: string
  items: CartItem[]
  createdAt: string
  updatedAt: string
}
