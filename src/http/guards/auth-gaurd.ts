import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthJwtService } from '../auth/auth-jwt-service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthJwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest()
    const [_, token] = req.headers.authorization.split(' ')

    try {
      const data = this.authService.checkToken(token)

      req.tokenPayload = data

      return true
    } catch (error) {
      return false
    }
  }
}
