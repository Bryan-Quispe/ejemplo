import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifications')
export class Notification {
    //properties and columns here
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'event_id', nullable: false })
    @Index()
    eventId: string;

    @Column({ name: 'message', nullable: false })
    message: string;

    @Column({ name: 'action', nullable: false, length: 20 })
    action: string;

    @Column({ name: 'microservice', nullable: false })
    microservice: string;

    @Column({ name: 'entity_id', nullable: false })
    @Index()
    entityId: string;

    @Column({ name: 'entity_type', nullable: false })
    entityType: string;

    @Column({ name: 'created_at'})
    createdAt: Date;

    @Column({ name: 'event_timestamp'})
    eventTimestamp: Date;

    @Column({ name: 'read', type: 'boolean', default: false })
    read: boolean;

    @Column({ name: 'processed', type: 'boolean', default: false })
    processed: boolean;

    @Column({ name: 'data', type: 'jsonb', nullable: true })
    data: Record<string, any>;//Record es como un hashmap o diccionario
}