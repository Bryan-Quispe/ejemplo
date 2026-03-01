import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NotificationService } from "./notification.service";

@Controller('notifications')
@ApiTags('notifications') //Documentacion del swagger
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) {}

    @Get()
    async findAll() {
        return await this.notificationService.findAll();
    }

}