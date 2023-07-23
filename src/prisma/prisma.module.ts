import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Module({
  providers: [PrismaService], // declarando que o PrismaService faz parte desta caixinha
  exports: [PrismaService], // quem importar o PrismaModule vai ter acesso ao PrismaService
})
export class PrismaModule {}
