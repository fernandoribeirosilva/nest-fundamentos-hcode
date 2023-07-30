import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { UserIdCheckMiddleware } from 'src/middlewares/user-id-check-middleware'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})

// configurando um middleware, para isso deve usar NestModule
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // este apply é ele que vai aplica o middleware, se tiver vários middleware é só dividir com virgular
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id', // filtrando quais rotas vai se aplicados o middleware
      method: RequestMethod.ALL, // todos os métodos
    })
  }
}
