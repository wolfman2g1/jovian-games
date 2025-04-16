import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [ ConfigModule.forRoot({
      isGlobal: true,
    }),AuthModule, UsersModule, GamesModule],
})
export class AppModule {}
