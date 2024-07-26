import { HttpService } from '@nestjs/axios';
import {
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

import { IGithubRepositoryFile } from '@/adapters/github/types/github-repository-file.interface';
import { IGithubRepositoryWebhook } from '@/adapters/github/types/github-repository-webhook.interface';
import { IGithubRepository } from '@/adapters/github/types/github-repository.interface';
import { CVSFileReportDto } from '@/core/dtos/files.dto';
import { bytesToMegaBytes } from '@/system/bytes-to-megabytes.sys';
import { roundFloat } from '@/system/round-float.sys';

@Injectable()
export class GithubApiService {
    private static readonly GITHUB_BASE_URL: string = 'https://api.github.com';

    constructor(private readonly httpService: HttpService) {}

    async getGithubOrgRepositories(
        apiToken: string,
        organisationName: string,
    ): Promise<IGithubRepository[] | undefined> {
        try {
            const endpoint: string = `${GithubApiService.GITHUB_BASE_URL}/orgs/${organisationName}/repos/repos`;

            const response: AxiosResponse = await lastValueFrom(
                this.httpService.get<IGithubRepository[]>(
                    endpoint,
                    this.getRequestHeaders(apiToken),
                ),
            );

            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === HttpStatus.NOT_FOUND) {
                    throw new NotFoundException();
                }
            }
        }
    }

    async getGithubRepositories(apiToken: string): Promise<IGithubRepository[] | undefined> {
        try {
            const endpoint: string = `${GithubApiService.GITHUB_BASE_URL}/user/repos`;
            const response: AxiosResponse = await lastValueFrom(
                this.httpService.get<IGithubRepository[]>(
                    endpoint,
                    this.getRequestHeaders(apiToken),
                ),
            );
            return response.data;
        } catch (error) {
            console.log(error);

            if (error instanceof AxiosError) {
                if (error.response?.status === HttpStatus.NOT_FOUND) {
                    throw new NotFoundException();
                }
            }
        }
    }

    async getRepositoryFiles(
        apiToken: string,
        owner: string,
        repo: string,
    ): Promise<CVSFileReportDto> {
        try {
            const files = await this.fetchDirectoryContents(apiToken, owner, repo);
            const totalSizeInBytes = files?.reduce((acc, file) => acc + file.size, 0) || 0;

            return {
                numberOfFiles: files?.length || 0,
                totalSize: `${roundFloat(bytesToMegaBytes(totalSizeInBytes), 4)} MB`,
                files: files || [],
            };
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while fetching the repository files.',
            );
        }
    }

    async getRepositoryWebhooks(
        apiToken: string,
        owner: string,
        repo: string,
    ): Promise<IGithubRepositoryWebhook[] | undefined> {
        try {
            const url = `${GithubApiService.GITHUB_BASE_URL}/repos/${owner}/${repo}/hooks`;

            const response = await lastValueFrom(
                this.httpService.get<IGithubRepositoryWebhook[]>(
                    url,
                    this.getRequestHeaders(apiToken),
                ),
            );
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === HttpStatus.NOT_FOUND) {
                    throw new NotFoundException();
                }
            }
            console.log(error);
        }
    }

    async fetchFileContent(
        apiToken: string,
        owner: string,
        repo: string,
        path: string,
    ): Promise<string | undefined> {
        try {
            const url = `${GithubApiService.GITHUB_BASE_URL}/repos/${owner}/${repo}/contents/${path}`;
            const response = await lastValueFrom(
                this.httpService.get(url, this.getRequestHeaders(apiToken)),
            );
            const content = response.data.content;
            return Buffer.from(content, 'base64').toString('utf8');
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === HttpStatus.NOT_FOUND) {
                    throw new NotFoundException();
                }
            }
        }
    }

    // TODO: redo with async generators
    private async fetchDirectoryContents(
        apiToken: string,
        owner: string,
        repo: string,
        path = '',
    ): Promise<IGithubRepositoryFile[] | undefined> {
        try {
            const endpoint = `${GithubApiService.GITHUB_BASE_URL}/repos/${owner}/${repo}/contents/${path}`;

            const response = await lastValueFrom(
                this.httpService.get(endpoint, this.getRequestHeaders(apiToken)),
            );
            const contents = response.data;

            const files = [];
            for await (const item of contents) {
                if (item.type === 'file') {
                    files.push(item as never);
                } else if (item.type === 'dir') {
                    const subdirectoryFiles = await this.fetchDirectoryContents(
                        apiToken,
                        owner,
                        repo,
                        item.path,
                    );
                    files.push(...(subdirectoryFiles as never[]));
                }
            }

            return files;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === HttpStatus.NOT_FOUND) {
                    throw new NotFoundException();
                }
            }
        }
    }

    private getRequestHeaders(apiToken: string): AxiosRequestConfig {
        return {
            headers: {
                Authorization: `token ${apiToken}`,
                Accept: 'application/vnd.github.v3+json',
            },
        };
    }
}
