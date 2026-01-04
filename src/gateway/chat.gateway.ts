import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server!: Server;
}

  handleConnection(client: Socket) { console.log(`Client connected: ${client.id}`); }
  handleDisconnect(client: Socket) { console.log(`Client disconnected: ${client.id}`); }

  @SubscribeMessage("secret:message:send")
  handleSecretMessage(client: Socket, payload: any) {
    client.broadcast.emit("secret:message:new", payload);
  }

  @SubscribeMessage("message:send")
  handleMessage(client: Socket, payload: any) {
    client.broadcast.emit(`chat:${payload.chatId}:message:new`, payload);
  }
}

