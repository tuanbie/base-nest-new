import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class ProducerService {
    constructor(@Inject("RABBITMQ_SERVICE") private readonly client: ClientProxy) {}

    async sendEmail(emailData: any) {
        return this.client.emit("send_email", emailData);
    }

    // async logEvent(logData: any) {
    //     return this.client.emit("log_routing_key", logData);
    // }

    onModuleInit() {
        this.client.connect();
    }
}
