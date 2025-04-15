import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsUUID } from "class-validator"

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty() 
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsString()
    @IsEmail()  
    email: string;
    @IsNotEmpty()
    @IsString()
    first_name: string;
    @IsNotEmpty()
    @IsString()
    last_name: string;
    @IsNotEmpty()
    @IsPhoneNumber()
    @IsString()
    phone_number: string;
}


export interface UserInputDto {
    username: string
    password: string
    email: string
    first_name: string
    last_name: string
    phone_number: string
}

export class LoginDto{
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty() 
    @IsString()
    password: string;
}

export class UserDto {
    id: string
    username: string
    email: string
    first_name: string
    last_name: string
    phone_number: string
    created_at: Date
    updated_at: Date
}
export class UserID {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string
}