import { CustomEntity } from "@common/decorators/custom-entity.decorator";
import { BaseEntity } from "./base.entity";
import { Column, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@CustomEntity(Feedback.name)
export class Feedback extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar" })
    content: string;

    @Index()
    @ManyToOne(() => User, (user) => user.sender)
    @JoinColumn({
        name: "sender",
    })
    sender: User | number;
}
