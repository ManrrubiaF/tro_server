import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { about } from '../../entities/about.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AboutService {
    constructor(
        @InjectRepository(about) private aboutRepo: Repository<about>){}

        getAll(){
            return this.aboutRepo.find();
        }
        createAbout(body: any){
            const newAbout = this.aboutRepo.create(body)
            return this.aboutRepo.save(newAbout)
        }

        async updateAbout(id:number, body: any){
            const aboutUp = await this.aboutRepo.findOne({
                where: {
                    id:id
                }
            });
            if(aboutUp){
                aboutUp.text = body.text;
            }else{
                throw(Error)
            }
            return this.aboutRepo.save(aboutUp);
        }
    
}
