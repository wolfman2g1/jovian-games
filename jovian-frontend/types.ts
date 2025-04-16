export interface Signup {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
}

export interface Login {
    username: string;
    password: string;
}

export interface Developer {
    id?: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface Category {
    id?: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface Genre{
    id?: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Game {
  id?: string
  name: string
  description?: string
  cpu?: number
  ram?: number
  price?: number
  imageUrl?: string
  categoryId?: string
  developerId?: string
  genreId?: string
  createdAt?: string
  updatedAt?: string
}