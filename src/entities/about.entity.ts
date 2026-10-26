import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class about {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    text!: string;
}