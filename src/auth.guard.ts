import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  // 인가를 실질적으로 작업하는 함수
  private validateRequest(request: any) {
    const jwtString = request.headers.authorization.split('Bearer ')[1];
    this.authService.verify(jwtString);
    return true;
  }
}