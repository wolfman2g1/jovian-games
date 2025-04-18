"use server"

import { cookies } from "next/headers"

// Types for authentication
interface SignUpData {
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
}

interface LoginData {
  email: string
  password: string
  rememberMe?: boolean
}

// Function to sign up a new user
export async function signUp(data: SignUpData) {
  // In a real app, you would call your NestJS backend API
  // This is a mock implementation
  try {
    // Simulate API call to NestJS backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to sign up")
    }

    const { token, user } = await response.json()

    // Store the JWT token in a cookie
    const cookieStore = cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return user
  } catch (error) {
    // For demo purposes, we'll simulate a successful signup
    console.error("Sign up error:", error)

    // Mock successful response
    const mockToken = "mock_jwt_token_" + Math.random().toString(36).substring(2)
    const cookieStore = cookies()
    cookieStore.set("token", mockToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return {
      id: "1",
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    }
  }
}

// Function to log in a user
export async function login(data: LoginData) {
  // In a real app, you would call your NestJS backend API
  // This is a mock implementation
  try {
    // Simulate API call to NestJS backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to log in")
    }

    const { token, user } = await response.json()

    // Store the JWT token in a cookie
    const cookieStore = cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: data.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days if remember me, else 1 day
      path: "/",
    })

    return user
  } catch (error) {
    // For demo purposes, we'll simulate a successful login
    console.error("Login error:", error)

    // Mock successful response
    const mockToken = "mock_jwt_token_" + Math.random().toString(36).substring(2)
    const cookieStore = cookies()
    cookieStore.set("token", mockToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: data.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days if remember me, else 1 day
      path: "/",
    })

    return {
      id: "1",
      username: "user",
      first_name: "John",
      last_name: "Doe",
      email: data.email,
      role: data.email.includes("admin") ? "ADMIN" : "USER", // Changed to uppercase "ADMIN" and "USER" roles
    }
  }
}

// Function to log out a user
export async function logout() {
  const cookieStore = cookies()
  cookieStore.delete("token")
}

// Function to get the current user
export async function getCurrentUser() {
  // In development with auth disabled, return a mock user
  if (process.env.NEXT_PUBLIC_DISABLE_AUTH === "true") {
    return {
      id: "dev-user",
      username: "developer",
      first_name: "Development",
      last_name: "User",
      email: "dev@example.com",
      role: "ADMIN", // Give admin access in development
      bio: "This is a mock user for development",
      discord_username: "developer#1234",
    }
  }

  const cookieStore = cookies()
  const token = cookieStore.get("token")

  if (!token) {
    return null
  }

  try {
    // In a real app, you would verify the token with your NestJS backend
    // This is a mock implementation
    return {
      id: "1",
      username: "user",
      first_name: "John",
      last_name: "Doe",
      email: "user@example.com",
      role: "ADMIN", // Changed to uppercase "ADMIN" role
    }
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

// Middleware to check if user is authenticated
export async function isAuthenticated() {
  // Bypass authentication in development when flag is set
  if (process.env.NEXT_PUBLIC_DISABLE_AUTH === "true") {
    console.warn("⚠️ Authentication is disabled for development")
    return true
  }

  const user = await getCurrentUser()
  return !!user
}

// Middleware to check if user is an admin
export async function isAdmin() {
  // Bypass admin check in development when flag is set
  if (process.env.NEXT_PUBLIC_DISABLE_AUTH === "true") {
    console.warn("⚠️ Admin authentication is disabled for development")
    return true
  }

  const user = await getCurrentUser()
  return user?.role === "ADMIN" // Changed to check for uppercase "ADMIN"
}
