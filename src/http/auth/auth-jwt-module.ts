import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { env } from 'src/env'

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
    }),
  ],
})
export class AuthJwtModule {}
