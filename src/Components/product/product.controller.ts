import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private productServices:ProductService
    ){}

    @Get('/all')
    getAll(){
        return this.productServices.getAll();
    }

    @Post('/create')
    newProduct(@Body() body: any){
        console.log(body)
        return this.productServices.createProduct(body)
    }

    @Put('/update/:id')
    upProduct(@Param('id') id:number, @Body('body') body:any ){
        return this.productServices.updateProduct(id,body)
    }
    @Delete('/product/:id')
    delProduct(@Param('id') id:number){
        return this.productServices.deleteById(id)
    }
    @Patch('/:id/state')
    changeState(@Param('id') id:number){
        return this.productServices.changeState(id)
    }

}
