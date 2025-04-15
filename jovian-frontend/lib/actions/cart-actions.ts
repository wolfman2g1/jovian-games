"use server"

import { cookies } from "next/headers"
import type { Cart, CartItem } from "../types"
import { getGameServerById } from "../store"
import { revalidatePath } from "next/cache"

// Helper function to get cart from cookies
async function getCartFromCookies(): Promise<Cart> {
  const cartCookie = cookies().get("cart")?.value

  if (!cartCookie) {
    return {
      id: crypto.randomUUID(),
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  try {
    return JSON.parse(cartCookie) as Cart
  } catch (error) {
    console.error("Failed to parse cart cookie:", error)
    return {
      id: crypto.randomUUID(),
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }
}

// Helper function to save cart to cookies
async function saveCartToCookies(cart: Cart) {
  cookies().set("cart", JSON.stringify(cart), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}

// Get cart
export async function getCart(): Promise<Cart> {
  return getCartFromCookies()
}

// Add item to cart
export async function addToCart(serverId: string): Promise<void> {
  const server = await getGameServerById(serverId)

  if (!server) {
    throw new Error("Server not found")
  }

  const cart = await getCartFromCookies()
  const existingItemIndex = cart.items.findIndex((item) => item.serverId === serverId)

  if (existingItemIndex !== -1) {
    // Increment quantity if item already exists
    cart.items[existingItemIndex].quantity += 1
  } else {
    // Add new item
    const newItem: CartItem = {
      id: crypto.randomUUID(),
      serverId: server.id,
      name: server.name,
      price: server.price,
      quantity: 1,
      imageUrl: server.imageUrl,
    }

    cart.items.push(newItem)
  }

  cart.updatedAt = new Date().toISOString()
  await saveCartToCookies(cart)
  revalidatePath("/store")
}

// Remove item from cart
export async function removeFromCart(itemId: string): Promise<void> {
  const cart = await getCartFromCookies()
  cart.items = cart.items.filter((item) => item.id !== itemId)
  cart.updatedAt = new Date().toISOString()

  await saveCartToCookies(cart)
  revalidatePath("/store")
}

// Update item quantity
export async function updateCartItemQuantity(itemId: string, quantity: number): Promise<void> {
  if (quantity < 1) {
    return removeFromCart(itemId)
  }

  const cart = await getCartFromCookies()
  const itemIndex = cart.items.findIndex((item) => item.id === itemId)

  if (itemIndex !== -1) {
    cart.items[itemIndex].quantity = quantity
    cart.updatedAt = new Date().toISOString()
    await saveCartToCookies(cart)
    revalidatePath("/store")
  }
}

// Clear cart
export async function clearCart(): Promise<void> {
  const cart = await getCartFromCookies()
  cart.items = []
  cart.updatedAt = new Date().toISOString()

  await saveCartToCookies(cart)
  revalidatePath("/store")
}

// Create checkout session
export async function createCheckoutSession(): Promise<{ url: string }> {
  const cart = await getCartFromCookies()

  if (cart.items.length === 0) {
    throw new Error("Cart is empty")
  }

  try {
    // In a real app, this would call your NestJS backend to create a Stripe checkout session
    // For demo purposes, we'll simulate a successful response

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // This would normally come from your backend
    const checkoutUrl = `/checkout/success?session_id=${crypto.randomUUID()}`

    // Clear the cart after successful checkout
    await clearCart()

    return { url: checkoutUrl }
  } catch (error) {
    console.error("Failed to create checkout session:", error)
    throw new Error("Failed to create checkout session")
  }
}
