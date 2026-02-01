import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmpleadoService } from 'src/empleado/empleado.service';
import { PrismaService } from 'src/database/prisma.service';
import passport from 'passport';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from 'config/config';
import { LocalStrategy } from './strategy/local.strategy';
import { EmpleadoModule } from 'src/empleado/empleado.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [AuthController],
  // Hacer imports que es crear o pasar passportModule y jwtModule
  imports:[
    PassportModule,
    // El register recibe 2 cosas
      // 1. Secret  --> Viene de variable de entorno
      // 2.SignOption --> Tiempo de expiracion
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: {expiresIn: '8hrs'}

    }),
    EmpleadoModule
  ],
  providers: [AuthService, EmpleadoService, PrismaService, EmpleadoService,LocalStrategy, JwtStrategy],
})
export class AuthModule {}
