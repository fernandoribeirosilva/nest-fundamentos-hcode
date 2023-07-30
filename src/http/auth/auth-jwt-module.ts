import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { env } from 'src/env'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserModule } from '../controllers/user/user.module'
import { AuthController } from './auth-controller'

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [AuthController],
})
export class AuthJwtModule {}
