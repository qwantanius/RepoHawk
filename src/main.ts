import { env } from 'node:process';

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    const appPort: number = Number(env.APP_PORT);

    if (isNaN(appPort)) {
        Logger.error('APP_PORT is not set, integer expected');
        // Dont do this:
        // process.exit(1);
        // Exit gracefully:
        process.exitCode = 1;
        return Promise.resolve(undefined);
    }

    await app.listen(appPort);
}

bootstrap();
