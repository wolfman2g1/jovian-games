"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { uploadImage } from "@/lib/actions/upload-actions"

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  onRemove: () => void
  aspectRatio?: string
}

export function ImageUploader({ value, onChange, onRemove, aspectRatio = "1:1" }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Calculate aspect ratio for the container
  const [width, height] = aspectRatio.split(":").map(Number)
  const paddingBottom = `${(height / width) * 100}%`

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a local preview
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    // Start upload
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadImage(formData)

      if (result.success && result.url) {
        onChange(result.url)
        toast.success("Image uploaded successfully")
      } else {
        throw new Error(result.error || "Failed to upload image")
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Upload failed", {
        description: error instanceof Error ? error.message : "Please try again or use a different image",
      })
      // Clear the preview on error
      setPreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  function handleRemove() {
    onRemove()
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <div className="relative border rounded-md overflow-hidden bg-muted" style={{ paddingBottom }}>
        {value || preview ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={value || preview || "/placeholder.svg"}
                alt="Uploaded image"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="absolute top-2 right-2">
              <Button type="button" variant="destructive" size="icon" onClick={handleRemove} disabled={isUploading}>
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
            <p className="text-sm text-center text-muted-foreground">Click to upload or drag and drop</p>
            <p className="text-xs text-center text-muted-foreground mt-1">PNG, JPG or GIF (max. 15MB)</p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>
    </div>
  )
}
