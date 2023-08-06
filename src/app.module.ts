import { Module, forwardRef } from '@nestjs/common'
import { AuthJwtModule } from './http/auth/auth-jwt-module'
import { UserModule } from './http/controllers/user/user.module'

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => AuthJwtModule)],
  controllers: [],
  providers: [],
})
export class AppModule {}
