import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ModelsModule } from "@common/models/models.module";
import { HistoryModule } from "@modules/history/history.module";
import { HistoryService } from "@modules/history/history.service";

@Module({
    imports: [ModelsModule, HistoryModule],
    controllers: [UserController],
    providers: [UserService, HistoryService],
    exports: [UserService],
})
export class UserModule {}
