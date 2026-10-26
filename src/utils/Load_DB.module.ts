import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoadDatabase } from "./firstload";
import { about } from "../entities/about.entity";
import { product } from "../entities/product.entity";
//import { OnModuleInit } from "@nestjs/common";

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([about,product])
    ],
    providers: [LoadDatabase],
    exports: [LoadDatabase],
})

export class LoadDataBaseModule {}
/*implements OnModuleInit {
    constructor(private firstload: LoadDatabase){ }
    onModuleInit() {
        this.firstload.firstload()
    }
}*/
