import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from './cache/cache.module';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { RestModule } from './modules/rest/rest.module';
import { WsModule } from './modules/websockets/ws.module';
import { MicroModule } from './modules/microservices/micro.module';
import { GrpcModule } from './modules/grpc/grpc.module';
import { MetadataService } from './common/services/metadata.service';
import { MongoMetadataService } from './common/services/mongo-metadata.service';
import { MetadataSchema } from './common/schemas/metadata.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://localhost:27017/demo',
    ),
    MongooseModule.forFeature([{ name: 'Metadata', schema: MetadataSchema }]),
    PrismaModule,
    CacheModule,
    GraphqlModule,
    RestModule,
    WsModule,
    MicroModule,
    GrpcModule,
  ],
  controllers: [AppController],
  providers: [AppService, MetadataService, MongoMetadataService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private metadataService: MetadataService,
    private mongoMetadataService?: MongoMetadataService,
  ) {}

  async onModuleInit() {
    await this.metadataService.createInitialData();
    if (this.mongoMetadataService) {
      await this.mongoMetadataService.createInitialData();
    }
  }
}
