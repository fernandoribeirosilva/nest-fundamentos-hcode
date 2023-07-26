import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto'
import { UpdatePutUserDTO } from './dto/update-put-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Res() res: Response, @Body() body: CreateUserDTO) {
    try {
      const user = await this.userService.create(body)

      return res.status(201).json({ user })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)

        return res.status(404).json({ error: error.message })
      }
      throw error
    }
  }

  @Get()
  async list(@Res() res: Response) {
    try {
      const user = await this.userService.list()

      return res.status(200).json({ user })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)

        return res.status(404).json({ error: error.message })
      }
      throw error
    }
  }

  @Get(':id')
  async show(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    try {
      const user = await this.userService.show(id)

      return res.status(200).json({ user })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)

        return res.status(404).json({ error: error.message })
      }
      throw error
    }
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @Param('id', ParseUUIDPipe) id) {
    return await this.userService.update(id, data)
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchUserDTO,
    @Param('id', ParseUUIDPipe) id,
  ) {
    return await this.userService.updatePartial(id, data)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return {
      id,
    }
  }
}
