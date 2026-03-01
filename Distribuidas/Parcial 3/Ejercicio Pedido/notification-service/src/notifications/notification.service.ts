import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from './entity/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);
    
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
    ) {}

    async create(dto: CreateNotificationDto): Promise<Notification> {
        this.logger.log(`Creando notificación: ${JSON.stringify(dto)}`);
        
        try {
            const entityNotif = this.notificationRepository.create({
                ...dto,
                createdAt: new Date(), // ⭐ AGREGADO - establece la fecha actual
            });

            const saved = await this.notificationRepository.save(entityNotif);
            
            this.logger.log(` Notificación guardada: ${saved.id}`);
            return saved;
        } catch (error) {
            this.logger.error(` Error guardando notificación:`, error);
            throw error;
        }
    }

    async findAll(): Promise<Notification[]> {
        return await this.notificationRepository.find();
    }
}