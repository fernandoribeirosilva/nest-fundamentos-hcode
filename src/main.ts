import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // vai servir para validar qualquer rota global que usa DTO
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000)
}
bootstrap()
