// import { Module } from "@nestjs/common";
// import { ClientsModule, Transport } from "@nestjs/microservices";
// import { ConfigModule, ConfigService } from "@nestjs/config";

// @Module({
//     imports: [
//         ConfigModule.forRoot(), // Sử dụng .env cho cấu hình linh hoạt
//         ClientsModule.registerAsync([
//             {
//                 name: "RABBITMQ_SERVICE",
//                 imports: [ConfigModule],
//                 useFactory: () => ({
//                     transport: Transport.RMQ,
//                     options: {
//                         urls: ["amqps://sxutciga:w9r7AukdcBfOjNx31yJczD46F-G0RzWa@stingray.rmq.cloudamqp.com/sxutciga"],
//                         queue: "main_queue",
//                         queueOptions: { durable: true },
//                     },
//                 }),
//                 inject: [ConfigService],
//             },
//         ]),
//     ],
//     exports: [ClientsModule],
// })
// export class RabbitMQModule {}
