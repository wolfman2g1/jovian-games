"use client"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  onRemove: () => void
  aspectRatio?: string
}

export function ImageUpload({ value, onChange, onRemove, aspectRatio = "1:1" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  // In a real app, this would upload to your storage service
  const handleUpload = () => {
    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      // For demo purposes, we'll just use a placeholder image
      const aspectRatioValue = aspectRatio === "1:1" ? "400x400" : aspectRatio === "21:9" ? "800x340" : "400x400"

      onChange(`/placeholder.svg?height=${aspectRatioValue.split("x")[1]}&width=${aspectRatioValue.split("x")[0]}`)
      setIsUploading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {value ? (
        <div className="relative">
          <div
            className={`relative overflow-hidden rounded-lg border ${
              aspectRatio === "1:1" ? "h-40 w-40" : aspectRatio === "21:9" ? "h-[120px] w-[280px]" : "h-40 w-40"
            }`}
          >
            <Image src={value || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover" />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 ${
            aspectRatio === "1:1" ? "h-40 w-40" : aspectRatio === "21:9" ? "h-[120px] w-[280px]" : "h-40 w-40"
          }`}
          onClick={handleUpload}
        >
          <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Click to upload</p>
        </div>
      )}
      {!value && (
        <Button type="button" variant="outline" size="sm" disabled={isUploading} onClick={handleUpload}>
          {isUploading ? "Uploading..." : "Upload Image"}
        </Button>
      )}
    </div>
  )
}
