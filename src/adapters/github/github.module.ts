import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GithubApiService } from '@/adapters/github/api.service';
import { GithubAdapterService } from '@/adapters/github/github-adapter.service';

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [GithubAdapterService, GithubApiService, ConfigService],
    exports: [GithubAdapterService],
})
export class GithubModule {}
