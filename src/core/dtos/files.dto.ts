import { ApiProperty } from '@nestjs/swagger';

export class CVSRepositoryFileDto {
    @ApiProperty({ example: 'file.txt', type: String })
    name: string;

    @ApiProperty({ example: 'path/to/file.txt', type: String })
    path: string;

    @ApiProperty({ example: '3b8f58e...', type: String })
    sha: string;

    @ApiProperty({ example: 12345, type: String })
    size: number;

    @ApiProperty({ example: 'https://api.github.com/repos/owner/repo/contents/path', type: String })
    url: string;

    @ApiProperty({ example: 'https://api.github.com/repos/owner/repo/git/blobs/sha', type: String })
    git_url: string;

    @ApiProperty({ example: 'https://raw.githubusercontent.com/owner/repo/branch/path' })
    download_url: string;

    @ApiProperty({ example: 'file' })
    type: string;
}

export class CVSFileReportDto {
    @ApiProperty({ example: 10, description: 'The number of files in the repository' })
    numberOfFiles: number;

    @ApiProperty({
        example: '12.3456 MB',
        description: 'The total size of all files in the repository in MB',
    })
    totalSize: string;

    @ApiProperty({
        type: [CVSRepositoryFileDto],
        description: 'Array of files in the repository',
    })
    files: CVSRepositoryFileDto[];
}
