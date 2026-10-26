import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import type { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Post('create')
    async createUser(@Body () body: any){
        return this.userService.createUser(body)
    }
    @Post('login')
    async login(@Body() body:any){
        return this.userService.auth(body)
    }
    @Post('validateAsk/:token')
    async tokenValidate(@Param('token') token: string, @Res() res:Response){
        const newToken = this.userService.tokenValidation(token);
        res.cookie('token', newToken, {
            httpOnly: true,
            maxAge: 3600000,
        })
        return res.send('Password update')
    }
}
