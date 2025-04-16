"use server"
import { Developer, Category, Genre } from "@/types"
const getBackendUrl = () => {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"
  console.log("Backend URL:", backendUrl)
  return backendUrl
}

// developers
export async function createDeveloper(name: Developer) {
    const response = await fetch(`${getBackendUrl()}/games/developer`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
    })
    if (!response.ok) {
        throw new Error("Failed to create developer")
    }
    return response.json()
    
}
export async function getAllDevelopers() {
    const response = await fetch(`${getBackendUrl()}/games/developer`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch developers")
    }
    return response.json()
}
export async function getDeveloperById(id: string) {
    const response = await fetch(`${getBackendUrl()}/games/developer/${id}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch developer")
    }
    return response.json()
}
export async function updateDeveloper(id: string, name: Developer) {
    const response = await fetch(`${getBackendUrl()}/games/developer/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
    })
    if (!response.ok) {
        throw new Error("Failed to update developer")
    }
    return response.json()
}
export async function deleteDeveloper(id: string) {
    const response = await fetch(`${getBackendUrl()}/games/developer/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Failed to delete developer")
    }
    return response.json()
}
// categories
export async function createCategory(name: Category) {  
    const response = await fetch(`${getBackendUrl()}/games/category`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
    })
    if (!response.ok) {
        throw new Error("Failed to create category")
    }
    return response.json()
}
export async function getAllCategories() {  
    const response = await fetch(`${getBackendUrl()}/games/category`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch categories")
    }
    return response.json()
}
export async function getCategoryById(id: string) {
    const response = await fetch(`${getBackendUrl()}/games/category/${id}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch category")
    }
    return response.json()
}
export async function updateCategory(id: string, name: Category) {
    const response = await fetch(`${getBackendUrl()}/games/category/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
    })
    if (!response.ok) {
        throw new Error("Failed to update category")
    }
    return response.json()
}
export async function deleteCategory(id: string) {
    const response = await fetch(`${getBackendUrl()}/games/category/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Failed to delete category")
    }
    return response.json()
}
// genres
export async function createGenre(name: Genre) {
    const response = await fetch(`${getBackendUrl()}/games/genre`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
    })
    if (!response.ok) {
        throw new Error("Failed to create genre")
    }
    return response.json()
}
export async function getAllGenres() {
    const response = await fetch(`${getBackendUrl()}/games/genre`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch genres")
    }
    return response.json()
}
export async function getGenreById(id: string) {
    const response = await fetch(`${getBackendUrl()}/games/genre/${id}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch genre")
    }
    return response.json()
}
export async function updateGenre(id: string, name: Genre) {
    const response = await fetch(`${getBackendUrl()}/games/genre/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
    })
    if (!response.ok) {
        throw new Error("Failed to update genre")
    }
    return response.json()
}
export async function deleteGenre(id: string) {
    const response = await fetch(`${getBackendUrl()}/games/genre/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Failed to delete genre")
    }
    return response.json()
}
// games
export async function createGame(game: any) {
    const response = await fetch(`${getBackendUrl()}/games`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
    })
    if (!response.ok) {
        throw new Error("Failed to create game")
    }
    return response.json()
}
export async function getAllGames() {
    const response = await fetch(`${getBackendUrl()}/games`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch games")
    }
    return response.json()
}
export async function getGameById(id: string) {
    const response = await fetch(`${getBackendUrl()}/games/${id}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch game")
    }
    return response.json()
}
export async function updateGame(id: string, game: any) {
    const response = await fetch(`${getBackendUrl()}/games/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
    })
    if (!response.ok) {
        throw new Error("Failed to update game")
    }
    return response.json()
}
export async function deleteGame(id: string) { 
    const response = await fetch(`${getBackendUrl()}/games/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Failed to delete game")
    }
    return response.json()
}   