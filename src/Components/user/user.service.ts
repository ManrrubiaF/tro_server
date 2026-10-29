import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    async auth(body: any) {
        const user = await this.userRepo.findOneBy({
            email: body.email,
        });

        if (!user) {
            console.log('LOGIN: usuario no encontrado');
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const ismatch = await bcrypt.compare(body.pass, user.pass);

        if (!ismatch) {
            console.log('LOGIN: contraseña incorrecta');
            throw new UnauthorizedException('Credenciales inválidas');
        }

        console.log('LOGIN: credenciales correctas');

        const payload = { sub: user.id };
        const token = await this.jwtService.signAsync(payload);

        return {
            id: user.id,
            email: user.email,
            token,
        };
    }

    async createUser(body: any){
        const newUser = new user();
        newUser.email = body.email;
        newUser.pass = await bcrypt.hash(body.pass, 5)

        return this.userRepo.save(newUser);
    }
    
    
    async tokenValidation(token: string) {
        try {
            const payload = this.jwtService.verify(token);

            const user = await this.userRepo.findOne({
                where: { id: payload.sub },
                });

            if (!user) {
            throw new UnauthorizedException('Usuario no válido');
            }
            return true;
        } catch {
            throw new UnauthorizedException('Token inválido o vencido');
        }
    }

    async deleteuser(id: number){
        const forDelete = await this.userRepo.findOneBy({id:id})

        return this.userRepo.delete(id)
    }

}
