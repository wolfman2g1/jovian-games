import { Injectable } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma"
import 'dotenv/config' 

@Injectable()
export class DatabaseService extends PrismaClient {
    constructor() {
        super({
            log: ['query', 'info', 'warn', 'error'],
                errorFormat: 'pretty',
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                },
            }
            });
        }
    }
