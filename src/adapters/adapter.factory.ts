import { Injectable, Scope } from '@nestjs/common';

import { CVSAdapterService } from '@/adapters/adapter.abstract';
import { GithubAdapterService } from '@/adapters/github/github-adapter.service';

@Injectable({ scope: Scope.REQUEST })
export class AdapterService {
    constructor(private readonly githubAdapterService: GithubAdapterService) {}

    private readonly adapterConfig: Map<string, CVSAdapterService> = new Map([
        [GithubAdapterService.TOKEN, this.githubAdapterService],
        // .... some other adapters .... //
        // [GitlabAdapterService.TOKEN, GitlabAdapterService]
    ]);

    getAdapter(adapterToken: string) {
        return this.adapterConfig.get(adapterToken);
    }
}
