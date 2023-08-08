import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { User } from '../decorators/user-decorator'
import { AuthGuard } from '../guards/auth-gaurd'
import { AuthJwtService } from './auth-jwt-service'
import { AuthForgetDTO } from './dto/auth-forget-dto'
import { AuthLoginDTO } from './dto/auth-login-dto'
import { AuthResetDTO } from './dto/auth-reset-dto'
import { AuthRegisterDTO } from './dto/register-dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthJwtService) {}

  @Post('login')
  async login(@Res() res: Response, @Body() { email, password }: AuthLoginDTO) {
    try {
      const { token } = await this.authService.login(email, password)
      return res.status(200).json({ token })
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(404).json({ message: error.message })
      }
      throw error
    }
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

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User('id') user) {
    return { user }
    // return await this.authService.checkToken(token)
  }
}
