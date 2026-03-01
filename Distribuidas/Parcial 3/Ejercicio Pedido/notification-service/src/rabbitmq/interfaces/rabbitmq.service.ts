import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Connection , Channel, connect, ConsumeMessage } from "amqplib";
import { NotificationService } from "src/notifications/notification.service";
import { NotificationEvent } from "./notification-event.interface";

@Injectable()//Todos los servicios son Inyectables
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
        private readonly logger = new Logger(RabbitMQService.name);
        private connection: Connection;
        private channel: Channel;

        private readonly exchangeName = 'notifications.exchange'; 
        private readonly queueName = 'notifications.queue';
        private readonly routingKey = 'notifications.routingkey';

        constructor(
            private readonly configService: ConfigService,
            private readonly notificationService: NotificationService,
        ) {}

    async onModuleInit() {
        await this.connect();
        await this.setupQueue();
        await this.consumeMessages();
    }

    async onModuleDestroy() {
        await this.closeConnection();
    }

    private async connect(): Promise<void> {
        try{
            const host = this.configService.get('RABBITMQ_HOST');
            const port = this.configService.get('RABBITMQ_PORT');
            const user = this.configService.get('RABBITMQ_USERNAME');
            const password = this.configService.get('RABBITMQ_PASSWORD');

            const conexion = `amqp://${user}:${password}@${host}:${port}`; //`` sirve Concatenar las variables 

            this.connection = await connect(conexion);
            this.channel = await this.connection.createChannel();

            this.logger.log('Conexión a RabbitMQ establecida');
        }catch (error) {
            this.logger.error('Error al conectar a RabbitMQ', error);
            throw error;
        }
    }
    
    private async setupQueue(): Promise<void> {
        try{
            //declarar el exchange
            await this.channel.assertExchange(this.exchangeName, 'topic', { 
                durable: true ,
            });  //Canal de intercambio de mensajes

            //declarar la cola - queue
            await this.channel.assertQueue(this.queueName, {
                durable: true,
            }); //Cola de mensajes

            //vincular la cola al exchange con la routing key
            await this.channel.bindQueue(
                this.queueName, 
                this.exchangeName, 
                this.routingKey
            ); 

            this.logger.log(`Cola ${this.queueName} y exchange ${this.exchangeName} configurados correctamente`);

        } catch (error) {
            this.logger.error(`Error al configurar la cola ${this.queueName} y el exchange ${this.exchangeName} en RabbitMQ`,
                 error
                );
            throw error;
        }
    }

    private async consumeMessages(): Promise<void> {
    try {
      await this.channel.consume(
        this.queueName,
        async (message: ConsumeMessage | null) => {
          if (message) {
            try {
              const contentString = message.content.toString();
              this.logger.debug(`Mensaje recibido: ${contentString}`);

              const content = JSON.parse(contentString) as NotificationEvent;

              this.logger.log(
                `Nueva notificación recibida: ${content.action} - ${content.entityType}`,
              );
              this.logger.debug(
                `Timestamp recibido: ${content.timestamp}, tipo: ${typeof content.timestamp}`,
              );

              // Parsear el timestamp correctamente
              let eventTimestamp: Date;
              if (content.timestamp) {
                try {
                  // Intentar parsear como ISO string
                  eventTimestamp = new Date(content.timestamp);

                  // Si es inválido, usar fecha actual
                  if (isNaN(eventTimestamp.getTime())) {
                    this.logger.warn(
                      `Timestamp inválido: ${content.timestamp}, usando fecha actual`,
                    );
                    eventTimestamp = new Date();
                  }
                } catch (error) {
                  this.logger.warn(
                    `Error parseando timestamp: ${error}, usando fecha actual`,
                  );
                  eventTimestamp = new Date();
                }
              } else {
                this.logger.warn(
                  `Timestamp no proporcionado, usando fecha actual`,
                );
                eventTimestamp = new Date();
              }

              // Guardar en base de datos
              await this.notificationService.create({
                eventId: content.id,
                microservice: content.microservice,
                action: content.action,
                entityType: content.entityType,
                entityId: content.entityId,
                message: content.message,
                eventTimestamp: eventTimestamp.toISOString(), // Enviar como ISO string
                data: content.data || {},
                severity: content.severity || 'INFO',
              });

              // Confirmar recepción del mensaje
              this.channel.ack(message);
            } catch (error) {
              this.logger.error('Error procesando mensaje:', error);
              this.logger.error(
                'Contenido del mensaje:',
                message.content.toString(),
              );

              // Rechazar mensaje (no lo reintenta)
              this.channel.nack(message, false, false);
            }
          }
        },
        {
          noAck: false, // Confirmación manual
        },
      );

      this.logger.log(`Consumiendo mensajes de la cola: ${this.queueName}`);
    } catch (error) {
      this.logger.error('Error iniciando consumo de mensajes:', error);
      throw error;
    }
  }
    private async closeConnection(): Promise<void> {
        try {

            if(this.channel) {
                await this.channel.close();
            }
            if(this.connection) {
                await this.connection.close();
            }
            this.logger.log('Conexión finalizada existosamente');
        }catch (error) {
            this.logger.error('Error al cerrar la conexión a RabbitMQ', error);
        }
    }

}