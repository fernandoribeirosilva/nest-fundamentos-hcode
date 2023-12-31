import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto'
import { UpdatePutUserDTO } from './dto/update-put-user.dto'

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
    console.log(id)

    const existsUser = await this.prisma.users.count({
      where: { id },
    })

    if (!existsUser) {
      console.log(id, existsUser)
      throw new Error('O usuário não existe.')
    }

    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async update(
    id: string,
    { name, email, password, birthAt, role }: UpdatePutUserDTO,
  ) {
    if (!(await this.show(id))) {
      throw new NotFoundException('O usuário não existe.')
    }

    const passwordHash = await hash(password, 6)

    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        birthAt: new Date(birthAt) ?? null,
        passwordHash,
        role,
      },
    })

    return { user }
  }

  async updatePartial(id: string, data: UpdatePatchUserDTO) {
    let dataUser: any = {}

    if (!(await this.show(id))) {
      throw new NotFoundException('O usuário não existe.')
    }

    for (const prop in data) {
      if (prop) {
        dataUser = {
          ...data,
          password: await hash(data.password, 6),
          birthAt: prop === 'birthAt' ? new Date(data[prop]) : null,
        }
      }
    }

    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        name: dataUser.name,
        email: dataUser.email,
        passwordHash: dataUser.password,
        birthAt: dataUser.birthAt,
        role: dataUser.role,
      },
    })

    return { user }
  }

  async delete(id: string) {
    if (!(await this.show(id))) {
      throw new Error('O usuário não existe.')
    }

    return await this.prisma.users.delete({
      where: {
        id,
      },
    })
  }
}
