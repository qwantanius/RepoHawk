import {
    BadRequestException,
    Controller,
    Get,
    Headers,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';

import { CVSAdapterService } from '@/adapters/adapter.abstract';
import { AdapterService } from '@/adapters/adapter.factory';
import { CSPFileExposeGuard } from '@/adapters/github/csp-file-expose.guard';
import { ApiTokenGuard } from '@/guards/api-token.guard';

@Controller('adapters')
export class CVSAdapterController {
    constructor(private readonly adapterService: AdapterService) {}

    @UseGuards(ApiTokenGuard)
    @Get(':adapterToken/repositories')
    async getRepositories(
        @Param('adapterToken') adapterToken: string,
        @Headers('API_TOKEN') apiToken: string,
    ) {
        return this.getAdapterOrFail(adapterToken)?.getCvsRepositories(apiToken);
    }

    // TODO: questionable functionality
    // @Get(':adapterToken/organisation/repositories')
    // async getOrganisationRepositories(
    //     @Query('organisationName') organisationName: string,
    //     @Param('adapterToken') adapterToken: string,
    //     @Headers('API_TOKEN') apiToken: string,
    // ) {
    //     return this.getAdapterOrFail(adapterToken)?.getCvsOrgRepositories(
    //         apiToken,
    //         organisationName,
    //     );
    // }

    @UseGuards(ApiTokenGuard)
    @Get(':adapterToken/repositories/:owner/:repo/files')
    async getRepositoryFiles(
        @Param('adapterToken') adapterToken: string,
        @Param('owner') owner: string,
        @Param('repo') repo: string,
        @Headers('API_TOKEN') apiToken: string,
    ) {
        return this.getAdapterOrFail(adapterToken)?.getCvsRepositoryFiles(apiToken, owner, repo);
    }

    @UseGuards(CSPFileExposeGuard)
    @UseGuards(ApiTokenGuard)
    @Get(':adapterToken/repositories/:owner/:repo/files/content')
    async getRepositoryFileContent(
        @Param('adapterToken') adapterToken: string,
        @Param('owner') owner: string,
        @Param('repo') repo: string,
        @Query('path') path: string,
        @Headers('API_TOKEN') apiToken: string,
    ) {
        return this.getAdapterOrFail(adapterToken)?.getCvsFileContent(apiToken, owner, repo, path);
    }

    @UseGuards(ApiTokenGuard)
    @Get(':adapterToken/repositories/:owner/:repo/webhooks')
    async getRepositoryWebhooks(
        @Param('adapterToken') adapterToken: string,
        @Param('owner') owner: string,
        @Param('repo') repo: string,
        @Headers('API_TOKEN') apiToken: string,
    ) {
        return this.getAdapterOrFail(adapterToken)?.getCvsRepositoryWebhooks(apiToken, owner, repo);
    }

    private getAdapterOrFail(adapterToken: string): CVSAdapterService | undefined {
        const adapter: CVSAdapterService | undefined = this.adapterService.getAdapter(adapterToken);

        if (!adapter) {
            new BadRequestException(`Adapter ${adapterToken} is not yet implemented.`);
        }

        return adapter;
    }
}
