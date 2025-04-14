import { User } from './../../generated/prisma/index.d';
import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/databse.service';
import { UserController } from './users.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';


@Module({
imports: [DatabaseModule],
  controllers: [UserController],
providers:[UserService]
})
export class UsersModule {}
