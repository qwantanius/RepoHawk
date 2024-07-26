export interface IGithubRepositoryWebhook {
    type: string;
    id: number;
    name: string;
    active: boolean;
    events: string[];
    config: IGithubRepositoryWebhookConfig;
    updated_at: string;
    created_at: string;
    url: string;
    test_url: string;
    ping_url: string;
    deliveries_url: string;
    last_response: IGithubRepositoryWebhookLastResponse;
}

export interface IGithubRepositoryWebhookConfig {
    content_type: string;
    insecure_ssl: string;
    url: string;
}

export interface IGithubRepositoryWebhookLastResponse {
    code: number;
    status: string;
    message: string;
}
