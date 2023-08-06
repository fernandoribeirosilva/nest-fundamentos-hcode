import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { Role } from 'src/enums/role-enum'
import { Roles } from 'src/http/decorators/role-decorator'
import { AuthGuard } from 'src/http/guards/auth-gaurd'
import { RoleGuard } from 'src/http/guards/role-gaurd'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto'
import { UpdatePutUserDTO } from './dto/update-put-user.dto'
import { UserService } from './user.service'

// @UseInterceptors(LogInterceptor)
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseInterceptors(LogInterceptor)
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

  // @Roles(Role.Admin, Role.User)
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
      console.log('user:id', id)

      const user = await this.userService.show(id)

      return res.status(200).json({ user })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)

        return res.status(404).json({ error: error.message })
      }
      return res.status(404).json({ error: error.message })
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
  async delete(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.userService.delete(id)
      return res.status(200).json({})
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)

        return res.status(404).json({ error: error.message })
      }

      throw error
    }
  }
}
