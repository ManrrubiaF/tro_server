import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { about } from "../entities/about.entity";
import { product } from "../entities/product.entity";


@Injectable()
export class LoadDatabase {
    constructor(
        private readonly httpService: HttpService,
        @InjectRepository(about)
        private readonly aboutRepository: Repository<about>,
        @InjectRepository(product)
        private readonly productRepository: Repository<product>
    ){}

    async getAbout(): Promise<about[]>{
        try {
            const response = await this.httpService.axiosRef.get("http://localhost:5000/about")
            return response.data;
        } catch (error) {
            console.error("Failed to get data from API:", error)            
            throw error;
        }
    }

    async getProducts(): Promise<product[]>{
        try {
            const response = await this.httpService.axiosRef.get("http://localhost:5000/products")
            return response.data;
        } catch (error) {
            console.error("Failed tu get products from API:", error)
            throw error
            
        }
    }

    async firstload() {
        const aboutData = await this.getAbout();
        const productsData = await this.getProducts();

        for (const oneAbout of aboutData) {
            const { id, ...aboutWithoutId } = oneAbout;

            const aboutEntity = this.aboutRepository.create(aboutWithoutId);
            await this.aboutRepository.save(aboutEntity);
        }

        console.log("about cargado");

        for (const oneProduct of productsData) {
            const { id, ...productWithoutId } = oneProduct;

            const productEntity = this.productRepository.create(productWithoutId);
            await this.productRepository.save(productEntity);
        }

        console.log("productos agregados");
        console.log("carga completa");
    }
}