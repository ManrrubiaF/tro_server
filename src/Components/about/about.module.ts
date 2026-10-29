import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { about } from '../../entities/about.entity';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([about]), AuthModule],
  controllers: [AboutController],
  providers: [AboutService]
})
export class AboutModule {}
