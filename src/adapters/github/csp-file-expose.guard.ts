import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class CSPFileExposeGuard implements CanActivate {
    public static readonly ALLOWED_FILE_TYPES_FOR_EXPOSURE: string[] = ['yml', 'cpp'];

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const path: string = request.query['path'] || '';

        const fileTypeValid: number = CSPFileExposeGuard.ALLOWED_FILE_TYPES_FOR_EXPOSURE.findIndex(
            (fileType: string) => {
                if (path.endsWith(`.${fileType}`)) {
                    return true;
                }
            },
        );

        if (fileTypeValid == -1) {
            throw new UnauthorizedException(
                `You are not authorized to perform this request. Incident will be reported.`,
            );
        }

        return true;
    }
}
