import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DeveloperDto {
     @IsNotEmpty() 
     @IsString()
    name: string
}
export class CategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string
}
export class GenreDto {
    @IsNotEmpty()
    @IsString()
    name: string
}

export class GameDto {
    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsString()
    description: string
    @IsNotEmpty()
    @IsString()
    image: string
    @IsNotEmpty()
    @IsString()
    developer: string
    @IsNotEmpty()
    @IsString()
    category: string
    @IsNotEmpty()
    cpu: number;
    @IsNotEmpty()
    ram: number;
    @IsNotEmpty()
    @IsNumber({}, { message: "Price must be a number" })
    price: number;
    @IsNotEmpty()
    @IsString()
    genre: string
}