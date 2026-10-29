import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
    @UseGuards(JwtAuthGuard)
    @Post('/create')
    newAbout(@Body('body') body: any){
        return this.aboutService.createAbout(body);
    }
    @UseGuards(JwtAuthGuard)
    @Put('/update/:id')
    upAbout(@Param('id') id:number, @Body ('body') body: any){
        return this.aboutService.updateAbout(id,body)
    }
}
