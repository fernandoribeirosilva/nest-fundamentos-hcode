import { BadRequestException, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    console.log('UserIdCheckMiddleware', 'antes')

    const data = z.string().uuid()

    const reqParams = data.parse(id)

    if (reqParams) {
      throw new BadRequestException('Id Invalid!')
    }

    console.log('UserIdCheckMiddleware', 'depois')

    next()
  }
}
