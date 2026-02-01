
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Indica que el campo de usuario en el body se llama `userName` (no `username` por defecto)
    super({ usernameField: 'userName', passwordField: 'password' });
  }

// Esto verifica si el usuario no esta encontrado retorna 401 de lo contrario retorna empleado
  async validate(userName: string, password: string): Promise<any> {
    const user = await this.authService.validateEmpleado({userName, password});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
