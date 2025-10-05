import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.connectWithRetry();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async connectWithRetry(attempts = 20, delay = 3000) {
    for (let i = 0; i < attempts; i++) {
      try {
        this.logger.log(
          `Attempting to connect to database (attempt ${i + 1}/${attempts})`,
        );

        await this.$connect();
        this.logger.log('Successfully connected to database');
        return;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        this.logger.warn(
          `Database connection attempt ${i + 1} failed: ${errorMessage}`,
        );
        if (i < attempts - 1) {
          this.logger.log(`Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    throw new Error('Failed to connect to database after multiple attempts');
  }
}
