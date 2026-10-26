import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutModule } from './Components/about/about.module';
import { ProductModule } from './Components/product/product.module';
import { UserModule } from './Components/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { LoadDataBaseModule } from './utils/Load_DB.module'
import { R2Module } from './r2/r2.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT ?? "5432"),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      ssl:  {
        rejectUnauthorized: false, 
      },
      synchronize: false,
      dropSchema: false,

    }),
    AboutModule, ProductModule, UserModule, HttpModule, LoadDataBaseModule, R2Module
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
