import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './databse.service';
@Global() // this makes the module available globally
@Module({
    providers: [DatabaseService],
    exports: [DatabaseService], // this allows other modules to use the database module
})
export class DatabaseModule {}
