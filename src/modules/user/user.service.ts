import { User } from "@common/models/entity/user.entity";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccountTypeEnum, ActivateEnum, MESSAGES, RoleFilter, UserRoles } from "@common/constants";
import { hashing } from "@common/utils/hashing.util";
import { LoginGoogleDto } from "@modules/auth/dtos/login.dto";
import { CreateUserDto, FilterUserDto, UpdateUserDto } from "./dto/input.dto";
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
        const { email, password } = body;

        const newUser = this.userRepository.create(body);
        newUser.email = email;
        newUser.password = await hashing(password);
        newUser.is_activate = ActivateEnum.ACCEPT;
        newUser.role = 1;
        const getUser = await this.userRepository.findOne({
            where: { email: email },
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
                email: "chungdi",
            },
            relations: ["role"],
        });
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

    async updateUser(body: UpdateUserDto, user: User) {
        // const findUser = await this.userRepository.findOne({ where: { email } });
        // console.log(findUser);
        // if (!findUser) {
        //     throw new ExceptionResponse(404, MESSAGES.NOT_FOUND_USER);
        // }
        const newDataUser = this.userRepository.merge(user, body);
        console.log(newDataUser);

        await this.userRepository.save(newDataUser);
        return;
    }

    async filterUser(filter: FilterUserDto) {
        const { page, limit, search, sort, role } = filter;
        const listUser = this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.role", "role")
            .select([
                "user.id",
                "user.name",
                "user.email",
                "user.avatar",
                "user.gender",
                "user.is_activate",
                "user.account_type",
                "user.BOD",
                "user.google_id",
                "user.token_google",
                "user.created_at",
                "user.phone",
            ]);
        if (role == RoleFilter.ADMIN) {
            listUser.andWhere("role.id = :id", { id: 1 });
        } else {
            listUser.andWhere("role.id != :id", { id: 1 });
        }
        if (search) {
            listUser.andWhere("UPPER(user.name) LIKE UPPER(:search)", { search: search });
        }

        if (page) listUser.skip((page - 1) * limit);
        if (limit) listUser.take(limit);
        listUser.orderBy("user.created_at", "DESC");

        const users = await listUser.getMany();

        return users;
    }
}
