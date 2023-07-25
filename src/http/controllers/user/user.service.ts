import { Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDTO } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    const emailExists = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    })

    if (emailExists) {
      throw new Error('Email already exists.')
    }

    const passwordHash = await hash(data.password, 6)

    const user = await this.prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
      },
    })

    return user
  }

  async list() {
    const user = await this.prisma.users.findMany()
    return user
  }

  async show(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    })

    return user
  }
}
