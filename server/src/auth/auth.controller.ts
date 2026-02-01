import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmpleadoService } from 'src/empleado/empleado.service';
import { CreateEmpleadoDto } from 'src/database/dto/empleado.create.dto';
import { empleadoEntity } from 'src/empleado/empleado.entity';
import type { Request as ExpressRequest } from 'express';
import { localAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService, private readonly empleadoService: EmpleadoService){}

    // Cuando se use el metodo post y se le pase un "/register" vamos a usar el metodo asincrono llamado register
    @Post("/register")
    async register(@Body() body: CreateEmpleadoDto){
        // retornar el metodo de empleadoService
        return await this.empleadoService.createEmpleado(body)
    };
    // esto nos oermite realizar el tema de autenticacion
    @UseGuards(localAuthGuard)
    // crear metodo de autenticacion
    @Post('/login')
    // No usamos @Body() porque la autenticación la realiza la strategy (p. ej. Passport),
    // que coloca el usuario autenticado en req.user.
    async login(@Req() req: ExpressRequest) {
      // req.user: objeto del usuario autenticado (rellenado por la strategy)
      // casteamos a nuestro tipo de entidad y delegamos la lógica al servicio
      return await this.authService.Login(req.user as empleadoEntity);
    }
   @UseGuards(JwtAuthGuard)
   @Get('/profile')
    async getProfile(@Req() req: ExpressRequest & { user?: { empleadoId: number } }){
        // Passport / JwtStrategy añade el usuario en `req.user`.
        // Verificamos que exista el id y sea número
        const empleadoId = req.user?.empleadoId;
        if (!empleadoId || typeof empleadoId !== 'number') {
            throw new (require('@nestjs/common').UnauthorizedException)('Usuario no autenticado');
        }

        try {
            return await this.empleadoService.getEmpleadoById(empleadoId);
        } catch (error) {
            console.error('Error obteniendo perfil:', error);
            throw error; // Dejar que Nest maneje la excepción (NotFound | InternalServerError)
        }
    }


}
