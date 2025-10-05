import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';
import { MetadataService } from '../../common/services/metadata.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CacheModule } from '../../cache/cache.module';

@Module({
  imports: [PrismaModule, CacheModule],
  controllers: [RestController],
  providers: [MetadataService],
})
export class RestModule {}
