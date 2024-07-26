import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CVSAdapterController } from '@/adapters/adapter.controller';
import { AdapterService } from '@/adapters/adapter.factory';
import { GithubModule } from '@/adapters/github/github.module';
import { ApiTokenGuard } from '@/core/guards/api-token.guard';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        GithubModule,
    ],
    controllers: [CVSAdapterController],
    providers: [AdapterService, ApiTokenGuard],
})
export class AppModule {}
// abstract ignoreCvsRepository();
