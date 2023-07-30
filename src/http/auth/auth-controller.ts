import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from '../controllers/user/user.service'
import { AuthJwtService } from './auth-jwt-service'
import { AuthForgetDTO } from './dto/auth-forget-dto'
import { AuthLoginDTO } from './dto/auth-login-dto'
import { AuthResetDTO } from './dto/auth-reset-dto'
import { AuthRegisterDTO } from './dto/register-dto'

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthJwtService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return await this.authService.login(email, password)
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return await this.userService.create(body)
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return await this.authService.forget(email)
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return await this.authService.reset(password, token)
  }
}
