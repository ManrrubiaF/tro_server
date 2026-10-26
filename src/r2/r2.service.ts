
import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class R2Service {
  private readonly client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
  }


    async deleteFile(publicUrl: string): Promise<void> {
    const publicBaseUrl = process.env.R2_PUBLIC_URL!.replace(/\/+$/, '');

    // Verifica que la URL pertenezca a tu dominio público de R2.
    if (!publicUrl.startsWith(`${publicBaseUrl}/`)) {
        throw new BadRequestException('La URL del objeto no es válida');
    }

    const key = publicUrl
        .slice(publicBaseUrl.length + 1)
        .split('/')
        .map(segment => decodeURIComponent(segment))
        .join('/');

    if (!key || key.includes('..')) {
        throw new BadRequestException('La clave del objeto no es válida');
    }

    await this.client.send(
        new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        }),
    );
    }


  async uploadFile(
    file: { buffer: Buffer },
    key: string,
    ): Promise<string> {
    const bucket = process.env.R2_BUCKET_NAME;
    const publicUrl = process.env.R2_PUBLIC_URL;

    if (!bucket || !publicUrl) {
      throw new InternalServerErrorException(
        'Falta configurar R2_BUCKET_NAME o R2_PUBLIC_URL',
      );
    }

    await this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: 'application/octet-stream',
      }),
    );

    return `${publicUrl.replace(/\/$/, '')}/${key
      .split('/')
      .map(encodeURIComponent)
      .join('/')}`;
  }
}
