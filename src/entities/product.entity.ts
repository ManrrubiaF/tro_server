import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class product{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column()
    description!: string;
    @Column()
    category!: string;
    @Column('text',{array:true, nullable:false})
    photos!: string[];
    @Column({default: true})
    active!: Boolean;
    @Column('text',{default:""})
    identification!:string;
    @Column({type:'timestamp', nullable: true})
    deletedAd!: Date | null;
    

}