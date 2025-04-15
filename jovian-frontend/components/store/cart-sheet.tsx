"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { CartItem } from "@/lib/types"
import { getCart, removeFromCart, createCheckoutSession } from "@/lib/actions/cart-actions"
import { toast } from "sonner"

export function CartSheet() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const fetchCart = async () => {
    try {
      const cart = await getCart()
      setCartItems(cart.items)
    } catch (error) {
      console.error("Failed to fetch cart:", error)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchCart()
    }
  }, [isOpen])

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId)
      setCartItems(cartItems.filter((item) => item.id !== itemId))
      toast.success("Item removed", {
        description: "The item has been removed from your cart.",
      })
    } catch (error) {
      toast.error("Error", {
        description: "Failed to remove item. Please try again.",
      })
    }
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const { url } = await createCheckoutSession()
      if (url) {
        router.push(url)
      }
    } catch (error) {
      toast.error("Checkout failed", {
        description: "There was an error processing your checkout. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
          <span className="ml-2 hidden md:inline">Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {cartItems.length === 0
              ? "Your cart is empty."
              : `You have ${cartItems.length} item${cartItems.length === 1 ? "" : "s"} in your cart.`}
          </SheetDescription>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1 py-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 h-8 w-8 text-muted-foreground"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4">
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>

              <SheetFooter>
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </Button>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center space-y-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some game servers to get started.</p>
            </div>
            <Button variant="outline" onClick={() => setIsOpen(false)} className="mt-4">
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
