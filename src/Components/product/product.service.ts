import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { product } from '../../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(product) private productRepo: Repository<product>
    ){}

    getAll(){
        return this.productRepo.find();
    }
    createProduct(body:any){
        
        const newProduct = this.productRepo.create(body)
        return this.productRepo.save(newProduct)
    }
    async updateProduct(id: number, body:any){
        const productExist = await this.productRepo.findOne({
            where:{
                id:id
            }
        })
        if(!productExist){
            throw new Error('Producto no encontrado')
        }
        if(body.description){
            productExist.description = body.text
        }
        if(body.name){
            productExist.name = body.name
        }
        if(body.photos){
            productExist.photos = body.photos
        }
        
        return this.productRepo.save(productExist)
    
    }
    
    async deleteById(id: number){
        const idExist = await this.productRepo.findOneBy({id:id})

        if(!idExist){
            throw new Error('No se pudo encontrar el producto')
            
        }

        idExist.active = false;
        idExist.deletedAd = new Date();

        return this.productRepo.save(idExist)
    }

    async changeState(id:number){
        const productExist = await this.productRepo.findOneBy({id:id})

        if(!productExist){
            throw new Error('producto no encontrado')
            
        }
        productExist.active = !productExist.active

        return this.productRepo.save(productExist)

    }
    
}
