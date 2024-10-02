import { User } from "@common/models/entity/user.entity";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccountTypeEnum, ActivateEnum, MESSAGES, UserRoles } from "@common/constants";
import { hashing } from "@common/utils/hashing.util";
import { LoginGoogleDto } from "@modules/auth/dtos/login.dto";
import { CreateUserDto, UpdateUserDto } from "./dto/input.dto";
import { CreateHistoryDto } from "@modules/history/dto/create-history.dto";
import { HistoryService } from "@modules/history/history.service";
import { ExceptionResponse } from "@common/exceptions/response.exception";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private historyService: HistoryService,
    ) {}

    async findUser(email: string) {
        return await this.userRepository.findOne({
            where: {
                email,
            },
            relations: ["role"],
        });
    }

    async create(body: CreateUserDto, adminId: number): Promise<any> {
        const { username, password } = body;

        const newUser = this.userRepository.create(body);
        newUser.username = username;
        newUser.email = username;
        newUser.password = await hashing(password);
        newUser.is_activate = ActivateEnum.ACCEPT;
        newUser.role = 1;
        const getUser = await this.userRepository.findOne({
            where: { username: username },
        });
        if (getUser) {
            throw new ConflictException(MESSAGES.ACCOUNTEXIST);
        }

        const builder = await this.userRepository.save(newUser);

        const newHistory = new CreateHistoryDto();
        newHistory.action = "User@create";
        newHistory.sendData = builder;
        newHistory.text = "Create user";
        newHistory.description = "Add admin";
        newHistory.user = adminId;
        await this.historyService.create(newHistory);

        return;
    }

    async filter(): Promise<any> {
        const newUser = await this.userRepository.find({
            where: {
                username: "chungdi",
            },
            relations: ["role"],
        });
        console.log(newUser);
        return newUser;
    }

    async getUserByGoogleId(id: string) {
        const user = await this.userRepository.findOne({
            where: { google_id: id },
            relations: { role: true },
            select: {
                id: true,
                name: true,
                avatar: true,
                phone: true,
                email: true,
                gender: true,
                account_type: true,
                is_activate: true,
                BOD: true,
                google_id: true,
                token_google: true,
            },
        });
        return user;
    }

    async createUser(data: LoginGoogleDto) {
        const { google_id } = data;
        const newUser = this.userRepository.create();
    }

    async createAccountGoogle(body: LoginGoogleDto) {
        const { accountType } = body;
        const newUser = this.userRepository.create(body);
        const role =
            accountType === AccountTypeEnum.CUSTOMER
                ? 2
                : accountType === AccountTypeEnum.DRIVER
                  ? 3
                  : accountType === AccountTypeEnum.TRANSPORT
                    ? 3
                    : 3;
        newUser.role = role;
        newUser.is_activate = ActivateEnum.PENDING;

        const user = await this.userRepository.save(newUser);
        return user;
    }

    async updateUser(body: UpdateUserDto, email: string) {
        const findUser = await this.userRepository.findOne({ where: { email } });
        if (!findUser) {
            throw new ExceptionResponse(404, MESSAGES.NOT_FOUND_USER);
        }
        const newDataUser = this.userRepository.merge(findUser, body);

        await this.userRepository.save(newDataUser);
        return;
    }
}
