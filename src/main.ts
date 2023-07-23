import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // vai servir para validar qualquer rota global que usa DTO
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(env.PORT)
}
bootstrap()
