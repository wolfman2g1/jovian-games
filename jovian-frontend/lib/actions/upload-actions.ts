"use server"

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"
import path from "path"

// Allowed file types
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]
const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.REGION!,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KE!,
  },
})

export async function uploadImage(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File

    // Validate file exists
    if (!file) {
      return { success: false, error: "No file provided" }
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit` }
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return { success: false, error: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed" }
    }

    // Generate a unique filename
    const fileExtension = path.extname(file.name)
    const randomName = crypto.randomBytes(16).toString("hex")
    const fileName = `${Date.now()}_${randomName}${fileExtension}`

    // Convert file to buffer
    const buffer = await file.arrayBuffer()

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: fileName,
      Body: Buffer.from(buffer),
      ContentType: file.type,
      ACL: "public-read", // Make the file publicly accessible
    })

    await s3Client.send(command)

    // Construct the full URL
    const cdnUrl =
      process.env.CDN_URL 
    const imageUrl = `${cdnUrl}/${fileName}`

    return { success: true, url: imageUrl }
  } catch (error) {
    console.error("Error uploading image:", error)
    return { success: false, error: "Failed to upload image. Please try again." }
  }
}

// Generate a pre-signed URL for direct browser uploads (optional, for larger files)
export async function getPresignedUploadUrl(fileName: string, fileType: string): Promise<string> {
  const fileExtension = path.extname(fileName)
  const randomName = crypto.randomBytes(16).toString("hex")
  const key = `${Date.now()}_${randomName}${fileExtension}`

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
    ContentType: fileType,
    ACL: "public-read",
  })

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }) // URL expires in 1 hour

  return signedUrl
}
