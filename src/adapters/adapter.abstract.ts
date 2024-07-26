import { CVSFileReportDto } from '@/core/dtos/files.dto';
import { CVSRepositoryDto } from '@/core/dtos/repository.dto';
import { CVSRepositoryWebhookDto } from '@/core/dtos/webhooks.dto';

export abstract class CVSAdapterService {
    abstract getCvsRepositories(apiToken: string): Promise<CVSRepositoryDto[] | undefined>;

    abstract getCvsOrgRepositories(
        apiToken: string,
        organisationName: string,
    ): Promise<CVSRepositoryDto[] | undefined>;

    abstract getCvsRepositoryFiles(
        apiToken: string,
        owner: string,
        repo: string,
    ): Promise<CVSFileReportDto>;

    abstract getCvsRepositoryWebhooks(
        apiToken: string,
        owner: string,
        repo: string,
    ): Promise<CVSRepositoryWebhookDto[] | undefined>;

    abstract getCvsFileContent(
        apiToken: string,
        owner: string,
        repo: string,
        path: string,
    ): Promise<string | undefined>;
    // Example for future improvement
    // abstract ignoreCvsRepository();
    // abstract watchCvsRepository();
}
