import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ ConfigModule.forRoot({
      isGlobal: true,
    }),AuthModule, UsersModule],
})
export class AppModule {}
