import { IsString, IsOptional } from 'class-validator';

export class MetadataDto {
  @IsString()
  chave: string;

  @IsString()
  valor: string;

  @IsOptional()
  @IsString()
  observacao?: string;
}

export class MetadataResponseDto {
  tecnologia: string;
  versao: string;
  mensagem: string;
  status: string;
  timestamp: string;
  cache: string;
  database?: string;
}
