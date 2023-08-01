import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Users } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from '../controllers/user/user.service'
import { AuthRegisterDTO } from './dto/register-dto'

@Injectable()
export class AuthJwtService {
  private issuer = 'login'
  private audience = 'users'

  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: Users) {
    const token = this.jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '10 seconds',
        subject: String(user.id),
        issuer: this.issuer,
        audience: this.audience,
      },
    )

    return token
  }

  async checkToken(token: string) {
    try {
      const isValidToken = await this.jwt.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      })

      return isValidToken
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async isValidToken(token: string) {
    try {
      this.checkToken(token)
      return true
    } catch (error) {
      return false
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    })

    const isValidEmail = await compare(password, user.passwordHash)
    if (!user && !isValidEmail) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos!')
    }

    return {
      token: this.createToken(user),
    }
  }

  async forget(email: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('E-mail incorretos!')
    }

    // TODO: Enviar o email...

    return true
  }

  async reset(password: string, token: string) {
    const id = '2sd3as'
    const passwordHash = await hash(password, 6)

    // TODO: validar o token...

    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        passwordHash,
      },
    })

    return {
      token: this.createToken(user),
    }
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data)

    return {
      token: this.createToken(user),
    }
  }
}
