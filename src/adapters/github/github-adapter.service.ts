import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CVSAdapterService } from '@/adapters/adapter.abstract';
import { GithubApiService } from '@/adapters/github/api.service';
import { IGithubRepositoryFile } from '@/adapters/github/types/github-repository-file.interface';
import { IGithubRepositoryWebhook } from '@/adapters/github/types/github-repository-webhook.interface';
import { IGithubRepository } from '@/adapters/github/types/github-repository.interface';

@Injectable({ scope: Scope.REQUEST })
export class GithubAdapterService implements CVSAdapterService {
    static TOKEN = 'github';

    constructor(
        // TODO: we must store credentials to service encrypted
        // why would anyone need to pass API_TOKEN in headers to external service
        private readonly configService: ConfigService,
        private readonly apiService: GithubApiService,
    ) {}

    async getCvsOrgRepositories(
        apiToken: string,
        organisationName: string,
    ): Promise<IGithubRepository[] | undefined> {
        const repositories = this.apiService.getGithubOrgRepositories(apiToken, organisationName);

        return repositories;
    }

    async getCvsRepositories(apiToken: string): Promise<IGithubRepository[] | undefined> {
        const repositories = this.apiService.getGithubRepositories(apiToken);

        return repositories;
    }

    async getCvsRepositoryFiles(
        apiToken: string,
        owner: string,
        repo: string,
    ): Promise<IGithubRepositoryFile[] | undefined> {
        const webhooks = this.apiService.getRepositoryFiles(apiToken, owner, repo);

        return webhooks;
    }

    async getCvsRepositoryWebhooks(
        apiToken: string,
        owner: string,
        repo: string,
    ): Promise<IGithubRepositoryWebhook[] | undefined> {
        const webhooks = this.apiService.getRepositoryWebhooks(apiToken, owner, repo);

        return webhooks;
    }

    async getCvsFileContent(
        apiToken: string,
        owner: string,
        repo: string,
        path: string,
    ): Promise<string | undefined> {
        const fileContent = this.apiService.fetchFileContent(apiToken, owner, repo, path);

        return fileContent;
    }
}
