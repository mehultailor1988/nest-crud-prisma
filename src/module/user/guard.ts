import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

 @Injectable()
export class TokenValidationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
        console.log("token : ", token);
    if (!token) {
      throw new HttpException('Authorization token is required', HttpStatus.FORBIDDEN);
    }

    // Optionally: You can add more validation for the token here

    return true;
  }
}