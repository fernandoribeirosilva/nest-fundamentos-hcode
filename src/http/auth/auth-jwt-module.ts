import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { env } from 'src/env'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserModule } from '../controllers/user/user.module'
import { AuthController } from './auth-controller'
import { AuthJwtService } from './auth-jwt-service'

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
    }),
    PrismaModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthJwtService],
  exports: [AuthJwtService],
})
export class AuthJwtModule {}
