import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient  {
  constructor() {
    super({
      log: ["error", "info", "query", "warn"],
    });
  }



 
}
