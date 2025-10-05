import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  MetadataService,
  DatabaseType,
} from '../../common/services/metadata.service';

interface MetadataRequest {
  db?: DatabaseType;
  cache?: boolean;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private metadataService: MetadataService) {}

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('getMetadata')
  async handleGetMetadata(
    client: Socket,
    @MessageBody() payload?: MetadataRequest,
  ): Promise<void> {
    const dbType = payload?.db || DatabaseType.POSTGRESQL;
    const useCache = payload?.cache !== false;

    const data = await this.metadataService.getVersionData(
      'WebSocket',
      dbType,
      useCache,
    );
    client.emit('metadata', data);
  }
}
