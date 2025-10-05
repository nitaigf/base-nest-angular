import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { MetadataService } from '../../common/services/metadata.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CacheModule } from '../../cache/cache.module';

@Module({
  imports: [PrismaModule, CacheModule],
  providers: [WsGateway, MetadataService],
})
export class WsModule {}
