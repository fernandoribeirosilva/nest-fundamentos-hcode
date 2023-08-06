import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from 'src/enums/role-enum'
import { ROLES_KEY } from '../decorators/role-decorator'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    /*
      Para um guard acessar um método é descobrir se na quele método se tem decorators aplicados.
      Neste caso vamos aplicar uma estrategia reflected, é como se estivesse refletindo o estrutura do objeto
      num espelho. Para isso vamos usar um objeto reflector que já faz esse reflect do código

      getAllAndOverride: retorna tudo o que foi sobrescrito, dentro da minha class que esta usando
    */
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    const rolesFiltered = requiredRoles.filter((role) => role === user.role)

    return rolesFiltered.length > 0
  }
}
