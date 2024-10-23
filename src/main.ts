import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as compression from "compression";
import helmet from "helmet";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { appSettings, development } from "@common/configs/appSetting";
import { Logging } from "@common/providers/logging/logging";
import { customLogsColor, customLogsText } from "@common/providers/logging/customLogging";
import { inCluster } from "./cluster";
import { NestExpressApplication } from "@nestjs/platform-express";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(compression());
    app.use(helmet());
    app.enableCors();
    app.setGlobalPrefix("api");

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL],
            queue: "main_queue",
            queueOptions: { durable: true },
        },
    });

    await app.startAllMicroservices();
    const config = new DocumentBuilder().setTitle("Nest base").setVersion("1.0").addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api-doc", app, document);

    await app.listen(appSettings.port, () => {
        const logging = new Logging();
        logging.debug(`${customLogsText.bold}${customLogsColor.pink}listening on port ${appSettings.port} 🚀`);
        logging.debug(
            `${customLogsText.bold}${customLogsColor.pink}api doc on http://localhost:${appSettings.port}/api-doc`,
        );
    });
}

development ? bootstrap() : inCluster(async () => bootstrap());
