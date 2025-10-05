import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import {
  MetadataService,
  DatabaseType,
} from '../../common/services/metadata.service';
import { MetadataResponseDto } from '../../common/dto/metadata.dto';

@ApiTags('gRPC')
@Controller('grpc')
export class GrpcController {
  constructor(private metadataService: MetadataService) {}

  @Get('meta')
  @ApiOperation({
    summary:
      'Get metadata via gRPC-style endpoint with flexible database and cache options',
  })
  @ApiQuery({
    name: 'db',
    required: false,
    enum: DatabaseType,
    description: 'Database to use (postgresql or mongodb)',
  })
  @ApiQuery({
    name: 'cache',
    required: false,
    type: 'boolean',
    description: 'Enable/disable cache',
  })
  @ApiResponse({ status: 200, description: 'Metadata retrieved successfully' })
  async getMetadata(
    @Query('db') db?: DatabaseType,
    @Query('cache') cache?: string,
  ): Promise<MetadataResponseDto> {
    const dbType = db || DatabaseType.POSTGRESQL;
    const useCache = cache !== 'false';

    return this.metadataService.getVersionData('gRPC', dbType, useCache);
  }
}
