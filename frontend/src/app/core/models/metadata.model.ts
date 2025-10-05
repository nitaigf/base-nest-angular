export interface Metadata {
  id: number;
  chave: string;
  valor: string;
  observacao?: string;
  criada_em: Date;
  atualizada_em: Date;
}

export interface MetadataResponse {
  tecnologia: string;
  versao: string;
  mensagem?: string;
  status?: string;
  timestamp?: string;
  cache?: string;
  database?: string;
}

export interface RequestConfig {
  database: 'postgresql' | 'mongodb';
  cache: boolean;
}

export interface ServiceConfig extends RequestConfig {
  method: 'REST' | 'GraphQL' | 'WebSocket' | 'Microservice' | 'gRPC';
  endpoint?: string;
}