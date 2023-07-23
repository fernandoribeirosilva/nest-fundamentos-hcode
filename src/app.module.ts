import { Module } from '@nestjs/common'
import { UserModule } from './http/controllers/user/user.module'

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
