import { env } from 'node:process';

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@/app.module';

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    const appPort: number = Number(env.APP_PORT);

    if (isNaN(appPort)) {
        Logger.error('APP_PORT is not set, integer expected');
        // Exit gracefully:
        process.exitCode = 1;
        return Promise.resolve(undefined);
    }

    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('API documentation for the CVS Adapter application')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(appPort);
}

bootstrap();
