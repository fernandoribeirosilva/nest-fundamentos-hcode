import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthJwtService } from '../auth/auth-jwt-service'
import { UserService } from '../controllers/user/user.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthJwtService,
    private readonly useService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest()
    const [_, token] = req.headers.authorization.split(' ')

    try {
      const data = this.authService.checkToken(token)

      req.tokenPayload = data

      req.user = await this.useService.show(data.id)

      return true
    } catch (error) {
      return false
    }
  }
}
