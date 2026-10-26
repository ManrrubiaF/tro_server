import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(user) 
        private userRepo: Repository<user>,
        private jwtService: JwtService,
    ){}

    async auth (body:any) {
        const user = await this.userRepo.findOneBy(
           {
                email: body.email
           }
        )

        if(!user){
            throw new Error('usuario inexistente')
        }

        const ismatch = await bcrypt.compare(body.pass, user.pass)
        if(ismatch){
            const payload = { sub: user.id}
            return {
                access_token: await this.jwtService.signAsync(payload)
            };

        } else {
            return 'Wrong credential'
        }

    }

    async createUser(body: any){
        const newUser = new user();
        newUser.email = body.email;
        newUser.pass = await bcrypt.hash(body.pass, 5)

        return this.userRepo.save(newUser);
    }
    
    
    async tokenValidation(token: string){
        const payload = this.jwtService.verify(token);

        const user = await this.userRepo.findOne({
            where:{
                email: payload.email
            }
        })
        if(user){
            const newToken = this.jwtService.sign({user: 'user'});
            return newToken;
        }
    }

    async deleteuser(id: number){
        const forDelete = await this.userRepo.findOneBy({id:id})

        return this.userRepo.delete(id)
    }

}
