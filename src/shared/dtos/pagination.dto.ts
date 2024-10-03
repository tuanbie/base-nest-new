import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class PaginationDto {
    @ApiProperty({
        required: false,
    })
    @IsOptional()
    page: number;

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    limit: number;

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    search: string;
}
