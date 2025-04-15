import { User } from '../../generated/prisma';
import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/databse.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config";
import { JwtStrategy } from './strategy';


@Module({
  imports: [DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }, // Token expiration time
      

      
  })
],
  controllers: [AuthController],
providers:[AuthService,JwtStrategy]
})
export class AuthModule {}
