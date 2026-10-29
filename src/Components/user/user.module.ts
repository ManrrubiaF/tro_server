import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from '../../entities/user.entity';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [    
    TypeOrmModule.forFeature([user]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService,],
})
export class UserModule {}