import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FirebaseAuthService } from './auth.service';

@Injectable()
export class FirebaseGuard implements CanActivate {
  constructor(
    private firebaseAuthService: FirebaseAuthService
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    const result = await this.firebaseAuthService.verifyToken(request.headers.authorization);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
