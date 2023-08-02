import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common'

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest()

    if (!req.user) {
      throw new NotFoundException(
        'Usuário não encontrado no Request. Use o AuthGuard para obter o usuário.',
      )
    }

    if (!filter) {
      return req.user
    }

    return req.user[filter]
  },
)
