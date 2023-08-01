import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { AuthJwtService } from './auth-jwt-service'
import { AuthForgetDTO } from './dto/auth-forget-dto'
import { AuthLoginDTO } from './dto/auth-login-dto'
import { AuthMeDTO } from './dto/auth-me-dto'
import { AuthResetDTO } from './dto/auth-reset-dto'
import { AuthRegisterDTO } from './dto/register-dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthJwtService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return await this.authService.login(email, password)
  }

  @Post('register')
  async register(@Res() res: Response, @Body() body: AuthRegisterDTO) {
    const token = await this.authService.register(body)
    return res.status(201).json({ token })
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return await this.authService.forget(email)
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return await this.authService.reset(password, token)
  }

  @Post('me')
  async me(@Body() { token }: AuthMeDTO) {
    return await this.authService.checkToken(token)
  }
}
