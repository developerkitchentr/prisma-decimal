import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
export declare class PrismaUniversal extends PrismaClient implements OnModuleInit {
    constructor();
    onModuleInit(): Promise<void>;
    convertDecimal(params: any, next: any): Promise<any>;
}
