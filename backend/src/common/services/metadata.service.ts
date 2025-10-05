import { Injectable, Logger, Optional } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../../cache/cache.service';
import { MongoMetadataService } from './mongo-metadata.service';
import { MetadataResponseDto } from '../dto/metadata.dto';

export enum DatabaseType {
  POSTGRESQL = 'postgresql',
  MONGODB = 'mongodb',
}

@Injectable()
export class MetadataService {
  private readonly logger = new Logger(MetadataService.name);

  constructor(
    private prisma: PrismaService,
    private cache: CacheService,
    @Optional() private mongoMetadata?: MongoMetadataService,
  ) {}

  async getVersionData(
    technology: string,
    dbType: DatabaseType = DatabaseType.POSTGRESQL,
    useCache = true,
  ): Promise<MetadataResponseDto> {
    const cacheKey = `metadata:${technology}:${dbType}`;

    try {
      if (useCache) {
        // Use cache-manager's remember pattern
        return await this.cache.remember(
          cacheKey,
          async (): Promise<MetadataResponseDto> => {
            return await this.fetchFromDatabase(technology, dbType, 'miss');
          },
          300, // TTL: 5 minutes
        );
      } else {
        // Direct database access without cache
        return await this.fetchFromDatabase(technology, dbType, 'disabled');
      }
    } catch (error) {
      this.logger.error(`Error getting metadata for ${technology}:`, error);
      return {
        tecnologia: technology,
        versao: '1.0.0',
        mensagem: `Backend ${technology} operacional (fallback)`,
        status: 'OK',
        timestamp: new Date().toISOString(),
        cache: 'error',
        database: dbType,
      };
    }
  }

  private async fetchFromDatabase(
    technology: string,
    dbType: DatabaseType,
    cacheStatus: string,
  ): Promise<MetadataResponseDto> {
    this.logger.log(
      `Fetching ${technology} metadata from ${dbType} (cache: ${cacheStatus})`,
    );

    let version = '1.0.0';

    if (dbType === DatabaseType.POSTGRESQL) {
      const versao = await this.prisma.metadata.findUnique({
        where: { chave: 'versao' },
      });
      version = versao?.valor || '1.0.0';
    } else if (dbType === DatabaseType.MONGODB) {
      if (this.mongoMetadata) {
        const versao = await this.mongoMetadata.getVersionData();
        version = versao?.valor || '1.0.0';
      } else {
        this.logger.warn('MongoDB service not available');
        version = '1.0.0 (MongoDB unavailable)';
      }
    }

    return {
      tecnologia: technology,
      versao: version,
      mensagem: `Backend ${technology} operacional (${dbType})`,
      status: 'OK',
      timestamp: new Date().toISOString(),
      cache: cacheStatus,
      database: dbType,
    };
  }

  async createInitialData(): Promise<void> {
    try {
      await this.prisma.metadata.upsert({
        where: { chave: 'versao' },
        update: {},
        create: {
          chave: 'versao',
          valor: '1.0.0',
          observacao: 'Versão inicial do sistema',
        },
      });
    } catch (error) {
      console.log(
        'Dados iniciais já existem ou erro de conexão:',
        (error as Error).message,
      );
    }
  }
}
