import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { NotificationModule } from 'src/notifications/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [RabbitMQService],
})
export class RabbitMQModule {}