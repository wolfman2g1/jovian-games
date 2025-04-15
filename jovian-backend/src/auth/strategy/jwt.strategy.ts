import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { DatabaseService } from "src/database/databse.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { 
    constructor(config: ConfigService,
        private prisma: DatabaseService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_SECRET') || (() => { throw new Error('JWT_SECRET is not defined'); })(),
        })
    }
    async validate(payload: { sub: string, role: string }) {
        const user = this.prisma.user.findUnique({
            where: {
                username: payload.sub
            },
             select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                 username: true,
                role: true
            }
        })
        if (!user) {
            throw new UnauthorizedException();
        }
       
        return user
    }
} 