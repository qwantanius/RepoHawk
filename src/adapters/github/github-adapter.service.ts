import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CVSAdapterService } from '@/adapters/adapter.abstract';
import { GithubApiService } from '@/adapters/github/api.service';
import { IGithubRepository } from '@/adapters/github/types/github-repository.interface';
import { CVSFileReportDto } from '@/core/dtos/files.dto';
import { CVSRepositoryDto } from '@/core/dtos/repository.dto';
import { CVSRepositoryWebhookDto } from '@/core/dtos/webhooks.dto';

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
    ): Promise<CVSRepositoryDto[] | undefined> {
        const repositories = await this.apiService.getGithubOrgRepositories(
            apiToken,
            organisationName,
        );

        return repositories?.map((repo) => this.repositoryInterfaceToDto(repo));
    }

    async getCvsRepositories(apiToken: string): Promise<CVSRepositoryDto[] | undefined> {
        const repositories = await this.apiService.getGithubRepositories(apiToken);

        return repositories?.map((repo) => this.repositoryInterfaceToDto(repo));
    }

    async getCvsRepositoryFiles(
        apiToken: string,
        owner: string,
        repo: string,
    ): Promise<CVSFileReportDto> {
        return this.apiService.getRepositoryFiles(apiToken, owner, repo);
    }

    async getCvsRepositoryWebhooks(
        apiToken: string,
        owner: string,
        repo: string,
    ): Promise<CVSRepositoryWebhookDto[] | undefined> {
        return this.apiService.getRepositoryWebhooks(apiToken, owner, repo);
    }

    async getCvsFileContent(
        apiToken: string,
        owner: string,
        repo: string,
        path: string,
    ): Promise<string | undefined> {
        return this.apiService.fetchFileContent(apiToken, owner, repo, path);
    }

    private repositoryInterfaceToDto(repo: IGithubRepository): CVSRepositoryDto {
        return {
            id: repo.id,
            name: repo.name,
            private: repo.private,
            description: repo.description,
            fork: repo.fork,
            full_name: repo.full_name,
            disabled: repo.disabled,
            git_url: repo.git_url,
            owner: repo.owner,
            url: repo.url,
            clone_url: repo.url,
            permissions: repo.permissions || {
                admin: false,
            },
        };
    }
}
