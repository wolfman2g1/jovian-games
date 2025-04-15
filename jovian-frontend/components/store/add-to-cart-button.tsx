"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { toast } from "sonner"
import type { GameServer } from "@/lib/types"
import { addToCart } from "@/lib/actions/cart-actions"

interface AddToCartButtonProps {
  server: GameServer
}

export function AddToCartButton({ server }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      await addToCart(server.id)
      setIsAdded(true)
      toast.success("Added to cart", {
        description: `${server.name} has been added to your cart.`,
      })

      // Reset the added state after 2 seconds
      setTimeout(() => {
        setIsAdded(false)
      }, 2000)
    } catch (error) {
      toast.error("Error", {
        description: "Failed to add to cart. Please try again.",
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding || isAdded}
      size="sm"
      className={isAdded ? "bg-green-500 hover:bg-green-600" : ""}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" /> Added
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </>
      )}
    </Button>
  )
}
