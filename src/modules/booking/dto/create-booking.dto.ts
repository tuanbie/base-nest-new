import { DriverTypeEnum } from "@common/constants";
import { PaymentEnum } from "@common/constants/payment.enum";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateBookingDto {
    @IsNotEmpty()
    @IsString()
    from: string;

    @IsNotEmpty()
    @IsString()
    to: string;

    @IsNotEmpty()
    @IsString()
    estimateTime: string;

    @IsNotEmpty()
    @IsString()
    starts: string;

    @IsNotEmpty()
    @IsString()
    price: string;

    @IsNotEmpty()
    @IsString()
    distance: string;

    @IsNotEmpty()
    @IsString()
    longFrom: string;

    @IsNotEmpty()
    @IsEnum({
        type: DriverTypeEnum,
    })
    carType: DriverTypeEnum;

    @IsNotEmpty()
    @IsEnum({
        type: PaymentEnum,
    })
    paymentMethod: PaymentEnum;
}
