## Prisma Decimal Convertor


``` typescript

import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common'
import {PrismaUniversal} from 'prisma-decimal'

@Injectable()
export class PrismaService extends PrismaUniversal
  implements OnModuleInit {
  async onModuleInit() {
    // optional: this.models = ['table'];
    this.$use(this.convertDecimal);
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}


```
