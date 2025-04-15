import { Injectable } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma"
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DatabaseService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            log: ['query', 'info', 'warn', 'error'],
                errorFormat: 'pretty',
            datasources: {
                db: {
                    url: config.get("DATABASE_URL"),
                },
            }
            });
        }
    }
