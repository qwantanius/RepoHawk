export interface IGithubRepositoryFile {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
    _links: IGithubRepositoryFileLinks;
}

export interface IGithubRepositoryFileLinks {
    self: string;
    git: string;
    html: string;
}
