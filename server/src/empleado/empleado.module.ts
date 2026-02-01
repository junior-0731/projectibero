import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ ],
  providers: [EmpleadoService,PrismaService,],
})
export class EmpleadoModule {}
