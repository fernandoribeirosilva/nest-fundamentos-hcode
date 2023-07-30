import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthJwtService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  static async createToken() {
    // return this.jwtService.sign()
  }

  static async checkToken() {
    // return this.jwtService.verify()
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        passwordHash: password,
      },
    })

    if (!user) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos!')
    }

    return user
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

    await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        passwordHash,
      },
    })

    return true
  }
}
