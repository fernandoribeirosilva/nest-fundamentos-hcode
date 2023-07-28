import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from './env'
import { LogInterceptor } from './http/interceptors/log-.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // vai servir para validar qualquer rota global que usa DTO
  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalInterceptors(new LogInterceptor())

  await app.listen(env.PORT)
}
bootstrap()
