
import {
    BadRequestException,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Body,
    Delete
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { R2Service } from './r2.service';


@Controller('r2')
export class R2Controller {
    constructor(
        private readonly r2Service: R2Service,
    ) {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            limits: {
                fileSize: 100 * 1024 * 1024,
            },
        }),
    )
    async uploadFile(
        @UploadedFile()
        file: {
            buffer: Buffer;
            originalname: string;
        },
    ) {
        if (!file) {
            throw new BadRequestException(
                'No se recibió ningún archivo',
            );
        }

        if (!file.originalname.toLowerCase().endsWith('.obj')) {
            throw new BadRequestException(
                'El archivo debe ser un modelo .obj',
            );
        }

        const fileName = file.originalname
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9._-]/g, '_');

        const key = fileName;

        const publicUrl = await this.r2Service.uploadFile(
            file,
            key,
        );

        return { publicUrl };
    }

    @Delete('delete')
    async deleteObject(@Body('publicUrl') publicUrl: string) {
        if (!publicUrl) {
            throw new BadRequestException('Falta la URL del objeto');
        }

        await this.r2Service.deleteFile(publicUrl);

        return {
            message: 'Objeto eliminado correctamente',
        };
    }

}
