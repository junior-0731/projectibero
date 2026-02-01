import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [AuthModule, EmpleadoModule, ContactModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
console.log('ContactModule loaded');
