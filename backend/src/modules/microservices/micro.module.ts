import { Module } from '@nestjs/common';
import { MicroController } from './micro.controller';
import { MetadataService } from '../../common/services/metadata.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CacheModule } from '../../cache/cache.module';

@Module({
  imports: [PrismaModule, CacheModule],
  controllers: [MicroController],
  providers: [MetadataService],
})
export class MicroModule {}
