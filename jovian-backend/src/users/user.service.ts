import { Body, Injectable } from "@nestjs/common";
import * as argon from "argon2";
import { UserInputDto } from "./dto";
import { DatabaseService } from "src/database/databse.service";

@Injectable({})
export class UserService {
    constructor(private prisma: DatabaseService)  {}
  async  signup(signup: UserInputDto) { 
        // Hash the password
        const hashedPassword = await argon.hash(signup.password);
        // Save the user to the database
        const user = await this.prisma.user.create({
            data: {
                email: signup.email,
                hashed_password: hashedPassword,
                first_name: signup.first_name,
                last_name: signup.last_name,
                username: signup.username
            },
        })
        // Return the user
        return user;
        
    }
    login() { }
 }