import { Module, forwardRef } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { AuthJwtModule } from './http/auth/auth-jwt-module'
import { UserModule } from './http/controllers/user/user.module'

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60, // 60 segundos, dentro deste tempo de 1 minuto quantos acessos a minha aplicação receba
      limit: 10, // a minha aplicação vai receber 10 solicitação dentro dos de um minuto, que é pouco
      // ignoreUserAgents: [/googlebot/gi], // se a minha api for indexada pelo google, eu posso liberar
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AuthJwtModule),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
