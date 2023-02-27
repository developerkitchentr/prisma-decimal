
import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaUniversal extends PrismaClient
  implements OnModuleInit {
  constructor() { super(); }
  async onModuleInit() {
  }
  async convertDecimal(params: any, next: any) {
    const result = await next(params)
    try {
      if (params.model) {
        (result as []).map((i: { [key: string]: any }) => {
          Object.keys(i).map((k: string) => {
            if (!isNaN(+i[k]) && typeof i[k] === 'object') {
              i[k] = Number(i[k]);
            }
          })
        })
      } else {
        (result as []).map((i: { [key: string]: any }) => {
          Object.keys(i).map((k: string) => {
            let item: { [key: string]: any } = i[k];
            if (item['prisma__type'] === 'decimal') {
              item['prisma__value'] = Number(item['prisma__value']);
              item['prisma__type'] = 'number';
            }
          });
        });
      }
    } catch (e) {
      console.error(`PrismaNext converting error => ${e}`);
    }
    return result
  }
}
