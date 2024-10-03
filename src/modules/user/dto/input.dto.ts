import { DriverTypeEnum, RoleFilter } from "@common/constants";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, NotEquals } from "class-validator";
import { PaginationDto } from "src/shared/dtos/pagination.dto";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    name: string;
}

export class FilterUserDto extends PaginationDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    sort: string;

    @IsEnum(RoleFilter)
    @IsNotEmpty()
    // @NotEquals(RoleFilter[RoleFilter.USER])
    public role: RoleFilter;

    @IsEnum(DriverTypeEnum)
    // @NotEquals(RoleFilter[RoleFilter.USER])
    public driverType: DriverTypeEnum;
}
