import { ApiProperty } from "@nestjs/swagger";

export class NotificationResponseDto {

    @ApiProperty()
    id: string;

    @ApiProperty()
    microservice: string;

    @ApiProperty()
    action: string;

    @ApiProperty()
    entityType: string;

    @ApiProperty()
    entityId: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    eventTimestamp: Date;

    @ApiProperty({required: false})
    data?: Record<string, any>; //cuando se coloca el ?: es opcional

    @ApiProperty()
    severity?: string;

    @ApiProperty()
    read: boolean;

    @ApiProperty()
    processed: boolean;
}