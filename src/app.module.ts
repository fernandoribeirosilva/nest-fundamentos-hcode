import { Module } from '@nestjs/common'
import { UserModule } from './http/controllers/user/user.module'
import { AuthJwtModule } from './http/auth/auth-jwt-module'

@Module({
  imports: [UserModule, AuthJwtModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
