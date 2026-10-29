import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from '../../entities/product.entity';
import { R2Module } from '../../r2/r2.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([product]), AuthModule,
  R2Module],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
