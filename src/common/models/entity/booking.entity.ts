import { CustomEntity } from "@common/decorators/custom-entity.decorator";
import { BaseEntity } from "./base.entity";
import { Column, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@CustomEntity(Booking.name)
export class Booking extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar", length: 30 })
    from: string;

    @Column({ type: "varchar", length: 30 })
    to: string;

    @Column({ type: "varchar", length: 30 })
    estimateTime: string;

    @Column({ type: "varchar", length: 30 })
    starts: string;

    @Column({ type: "varchar", length: 30 })
    paymentMethod: string;

    @Column({ type: "varchar", length: 30 })
    price: string;

    @Column({ type: "varchar", length: 30 })
    distance: string;

    @Column({ type: "varchar", length: 30 })
    longFrom: string;

    @Column({ type: "varchar", length: 30 })
    carType: string;

    @Index()
    @ManyToOne(() => User, (user) => user.driver)
    @JoinColumn({
        name: "driver",
    })
    driver: User | number;

    @Index()
    @ManyToOne(() => User, (user) => user.customer)
    @JoinColumn({
        name: "customer",
    })
    customer: User | number;
}
