import { MailService } from "@common/providers/mail";
import { SendMail } from "@common/providers/mail/mail.interface";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller()
export class ConsumerService {
    constructor(private readonly mailService: MailService) {}
    @EventPattern("send_email")
    async handleEmail(@Payload() message: SendMail) {
        console.log("Received email message:", message);
        await this.mailService.sendMail(message);
        return;
    }

    // @EventPattern("notification_routing_key")
    // async handleNotification(@Payload() message: any) {
    //     console.log("Received notification message:", message);
    //     // Xử lý logic notification
    // }

    // @EventPattern("log_routing_key")
    // async handleLog(@Payload() message: any) {
    //     console.log("Received log message:", message);
    //     // Xử lý logic ghi log
    // }
}
