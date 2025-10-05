import { Module } from '@nestjs/common';
import { GrpcController } from './grpc.controller';
import { MetadataService } from '../../common/services/metadata.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CacheModule } from '../../cache/cache.module';

@Module({
  imports: [PrismaModule, CacheModule],
  controllers: [GrpcController],
  providers: [MetadataService],
})
export class GrpcModule {}
