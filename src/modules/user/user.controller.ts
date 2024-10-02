import { Body, ClassSerializerInterceptor, Get, Patch, Post, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CustomController } from "@common/decorators/custom-controller.decorator";
import { CreateUserDto, UpdateUserDto } from "./dto/input.dto";
import { Authorize } from "@common/decorators/authorize.decorator";
import { UserRoles } from "@common/constants/role.enum";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import { ICurrentUser } from "@common/types/current-user.type";
import { MESSAGES } from "@common/constants";

@CustomController("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("filter")
    @UseInterceptors(ClassSerializerInterceptor)
    public async filter(): Promise<any> {
        return await this.userService.filter();
    }

    @Post("create")
    @UseInterceptors(ClassSerializerInterceptor)
    @Authorize(UserRoles.ADMIN)
    public async create(@Body() body: CreateUserDto, @CurrentUser() user: ICurrentUser): Promise<any> {
        await this.userService.create(body, user.id);
        return { message: MESSAGES.CREATED_SUCCEED };
    }

    @Patch("update_me")
    @UseInterceptors(ClassSerializerInterceptor)
    @Authorize(UserRoles.CUSTOMER, UserRoles.ADMIN, UserRoles.DRIVER, UserRoles.TRANSPORT)
    async updateMe(@Body() body: UpdateUserDto, @CurrentUser() user: ICurrentUser) {
        console.log(user);
        await this.userService.updateUser(body, user.email);
    }
}
