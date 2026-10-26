import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { about } from '../../entities/about.entity';

@Module({
  imports: [TypeOrmModule.forFeature([about])],
  controllers: [AboutController],
  providers: [AboutService]
})
export class AboutModule {}
