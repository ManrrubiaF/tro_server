import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from '../../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '2h' },
  }),
  TypeOrmModule.forFeature([user])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
