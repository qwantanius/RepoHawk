import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiTokenGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const apiToken = request.headers['api_token'];

        if (!apiToken) {
            // @report
            throw new UnauthorizedException(
                'You are unauthorized to complete this request. Incident will be reported',
            );
        }

        return true;
    }
}
