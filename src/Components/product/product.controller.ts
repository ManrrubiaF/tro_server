import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product')
export class ProductController {
    constructor(
        private productServices:ProductService
    ){}

    @Get('/all')
    getAll(){
        return this.productServices.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    newProduct(@Body() body: any){
        console.log(body)
        return this.productServices.createProduct(body)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update/:id')
    upProduct(@Param('id') id:number, @Body('body') body:any ){
        return this.productServices.updateProduct(id,body)
    }
    @UseGuards(JwtAuthGuard)
    @Delete('/product/:id')
    delProduct(@Param('id') id:number){
        return this.productServices.deleteById(id)
    }
    @UseGuards(JwtAuthGuard)
    @Patch('/:id/state')
    changeState(@Param('id') id:number){
        return this.productServices.changeState(id)
    }

}
