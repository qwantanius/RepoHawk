import { ApiProperty } from '@nestjs/swagger';

export class CVSRepositoryWebhookConfigDto {
    @ApiProperty({ example: 'json' })
    content_type: string;

    @ApiProperty({ example: '0' })
    insecure_ssl: string;

    @ApiProperty({ example: 'https://example.com/webhook' })
    url: string;
}

export class CVSRepositoryWebhookLastResponseDto {
    @ApiProperty({ example: 200 })
    code: number;

    @ApiProperty({ example: 'OK' })
    status: string;

    @ApiProperty({ example: 'Webhook successfully delivered' })
    message: string;
}

export class CVSRepositoryWebhookDto {
    @ApiProperty({ example: 'Repository' })
    type: string;

    @ApiProperty({ example: 12345678 })
    id: number;

    @ApiProperty({ example: 'web' })
    name: string;

    @ApiProperty({ example: true })
    active: boolean;

    @ApiProperty({ example: ['push', 'pull_request'] })
    events: string[];

    @ApiProperty({ type: CVSRepositoryWebhookConfigDto })
    config: CVSRepositoryWebhookConfigDto;

    @ApiProperty({ example: '2023-07-26T19:14:43Z' })
    updated_at: string;

    @ApiProperty({ example: '2023-07-26T19:01:12Z' })
    created_at: string;

    @ApiProperty({ example: 'https://api.github.com/repos/octocat/Hello-World/hooks/12345678' })
    url: string;

    @ApiProperty({
        example: 'https://api.github.com/repos/octocat/Hello-World/hooks/12345678/test',
    })
    test_url: string;

    @ApiProperty({
        example: 'https://api.github.com/repos/octocat/Hello-World/hooks/12345678/pings',
    })
    ping_url: string;

    @ApiProperty({
        example: 'https://api.github.com/repos/octocat/Hello-World/hooks/12345678/deliveries',
    })
    deliveries_url: string;

    @ApiProperty({ type: CVSRepositoryWebhookLastResponseDto })
    last_response: CVSRepositoryWebhookLastResponseDto;
}
