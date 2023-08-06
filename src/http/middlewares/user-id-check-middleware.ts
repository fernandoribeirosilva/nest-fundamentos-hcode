import { NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ZodError, z } from 'zod'

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      paramsSchema.parse(req.params)

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error)

        return res
          .status(400)
          .send({ message: 'Id invalid', issues: error.issues })
      }
      throw error
    }
  }
}
