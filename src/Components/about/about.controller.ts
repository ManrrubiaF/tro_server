import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AboutService } from './about.service';

@Controller('about')
export class AboutController {
    constructor(
        private aboutService: AboutService
    ){}

    @Get('/all')
    getAll(){
        return this.aboutService.getAll();
    }
    @Post('/create')
    newAbout(@Body('body') body: any){
        return this.aboutService.createAbout(body);
    }
    @Put('/update/:id')
    upAbout(@Param('id') id:number, @Body ('body') body: any){
        return this.aboutService.updateAbout(id,body)
    }
}
