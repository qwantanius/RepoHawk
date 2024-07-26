export abstract class CVSAdapterService {
    abstract getCvsRepositories(apiToken: string);
    abstract getCvsOrgRepositories(apiToken: string, organisationName: string);
    abstract getCvsRepositoryFiles(apiToken: string, owner: string, repo: string);
    abstract getCvsRepositoryWebhooks(apiToken: string, owner: string, repo: string);
    abstract getCvsFileContent(apiToken: string, owner: string, repo: string, path: string);
    // Example for future improvement
    // abstract ignoreCvsRepository();
    // abstract watchCvsRepository();
}
