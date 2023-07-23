import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto'
import { UpdatePutUserDTO } from './dto/update-put-user.dto'

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return { ...body }
  }

  @Get()
  async list() {
    return { users: [] }
  }

  @Get(':id')
  async show(@Param() params) {
    return {
      user: {},
      params,
    }
  }

  @Put(':id')
  async update(
    @Body() { email, name, password }: UpdatePutUserDTO,
    @Param() params,
  ) {
    return {
      method: 'put',
      email,
      name,
      password,
      params,
    }
  }

  @Patch(':id')
  async updatePartial(
    @Body() { email, name, password }: UpdatePatchUserDTO,
    @Param() params,
  ) {
    return {
      method: 'patch',
      email,
      name,
      password,
      params,
    }
  }

  @Delete(':id')
  async delete(@Param() params) {
    return {
      params,
    }
  }
}
