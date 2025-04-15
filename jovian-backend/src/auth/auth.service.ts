import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as argon from "argon2";
import { LoginDto, UserInputDto } from "./dto";
import { DatabaseService } from "src/database/databse.service";
import { JwtService } from '@nestjs/jwt';
@Injectable({})
export class AuthService {
    constructor(
        private prisma: DatabaseService,
        private jwtService: JwtService
    ) { }
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
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                username: true
            }
        })
      
        // Return the user
        return user;
        
    }
    async login(login: LoginDto): Promise<{ access_token: string }> {
        // find user
        const user = await this.prisma.user.findUnique({
            where: {
                username: login.username
            }
        });
        if (!user) {
            throw new ForbiddenException("Credentials incorrect");
        }
        // compare password
        const passwordMatches = await argon.verify(user.hashed_password, login.password);
        if (!passwordMatches) {
            throw new UnauthorizedException();
        }
        // mint a jwt token
         const payload = { sub: user.username, role: user.role };
        return {
           access_token: await this.jwtService.signAsync(payload)
        }
    }

 }