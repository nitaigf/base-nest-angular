import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface MongoMetadata {
  _id?: string;
  chave: string;
  valor: string;
  observacao?: string;
  criada_em?: Date;
  atualizada_em?: Date;
}

@Injectable()
export class MongoMetadataService {
  private readonly logger = new Logger(MongoMetadataService.name);

  constructor(
    @InjectModel('Metadata') private metadataModel: Model<MongoMetadata>,
  ) {}

  async getVersionData(): Promise<MongoMetadata | null> {
    try {
      const metadata = await this.metadataModel.findOne({ chave: 'versao' });
      return metadata;
    } catch (error) {
      this.logger.error('Error getting version data from MongoDB:', error);
      return null;
    }
  }

  async createInitialData(): Promise<void> {
    try {
      const existing = await this.metadataModel.findOne({ chave: 'versao' });
      if (!existing) {
        await this.metadataModel.create({
          chave: 'versao',
          valor: '1.0.0',
          observacao: 'Versão inicial do sistema (MongoDB)',
          criada_em: new Date(),
          atualizada_em: new Date(),
        });
        this.logger.log('Initial MongoDB metadata created');
      }
    } catch (error) {
      this.logger.error('Error creating initial MongoDB data:', error);
    }
  }
}
