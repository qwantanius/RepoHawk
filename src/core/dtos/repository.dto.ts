import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CVSRepositoryPermissionsDto {
    @ApiPropertyOptional({ example: true })
    admin?: boolean = false;

    @ApiPropertyOptional({ example: true })
    maintain?: boolean = false;

    @ApiPropertyOptional({ example: true })
    push?: boolean = false;

    @ApiPropertyOptional({ example: true })
    pull?: boolean = false;
}

export class CVSRepositoryOwnerDto {
    @ApiProperty({ example: 'octocat' })
    login: string;

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'https://api.github.com/users/octocat' })
    url: string;
}

export class CVSRepositoryDto {
    @ApiProperty({ example: 1296269 })
    id: number;

    @ApiProperty({ example: 'Hello-World' })
    name: string;

    @ApiProperty({ example: 'octocat/Hello-World' })
    full_name: string;

    @ApiProperty({ example: false })
    private: boolean;

    @ApiProperty({ type: CVSRepositoryOwnerDto })
    owner: CVSRepositoryOwnerDto;

    @ApiProperty({ example: null })
    description: any;

    @ApiProperty({ example: false })
    fork: boolean;

    @ApiProperty({ example: 'https://api.github.com/repos/octocat/Hello-World' })
    url: string;

    @ApiPropertyOptional({ example: '2011-01-26T19:01:12Z' })
    created_at?: string;

    @ApiPropertyOptional({ example: '2011-01-26T19:14:43Z' })
    updated_at?: string;

    @ApiPropertyOptional({ example: '2011-01-26T19:06:43Z' })
    pushed_at?: string;

    @ApiPropertyOptional({ example: 'git://github.com/octocat/Hello-World.git' })
    git_url?: string;

    @ApiPropertyOptional({ example: 'git@github.com:octocat/Hello-World.git' })
    ssh_url?: string;

    @ApiPropertyOptional({ example: 'https://github.com/octocat/Hello-World.git' })
    clone_url?: string;

    @ApiPropertyOptional({ example: 108 })
    size?: number;

    @ApiPropertyOptional({ example: false })
    archived?: boolean;

    @ApiProperty({ example: false })
    disabled: boolean;

    @ApiPropertyOptional({ type: CVSRepositoryPermissionsDto })
    permissions?: CVSRepositoryPermissionsDto;
}
