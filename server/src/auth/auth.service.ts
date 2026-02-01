import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmpleadoService } from 'src/empleado/empleado.service';
import { LoginDto } from './dto/login.dto';
// Importar bcrypt
import * as bcrypt from 'bcrypt';
import { empleadoEntity } from 'src/empleado/empleado.entity';
import { JwtService } from '@nestjs/jwt';

export interface IpayloadLogin {
  sub:number
  userName: string
}
@Injectable()
export class AuthService {
  // Uso de metodo de constructor, y crear nuestra variable empleadoService
  // Debemos crear una variable privada llamada jwtService que sera de 'JwtService'
  constructor(private readonly empleadoService: EmpleadoService, private jwtService: JwtService) {}
  // Crear metodo llamado validateEmpleado
  async validateEmpleado(body: LoginDto): Promise<any> {
    try {
      //Usaremos metodo findOneEmpleado que tenemos en empleadoService y pasamos el username
      const empleado = await this.empleadoService.findOneEmpleado(
        body.userName,
      );
      if(!empleado) return null;
      // Usaremos bcrypt para hacer comparaciones
      //vamos a hacer un match
      const match = await bcrypt.compare(body.password, empleado?.password!);
      // Si match es true debemos de retornar todo menos la contraseña
      if (match) {
        // Hacemos destructuring para no enviar la contraseña
        const {password, ...result} = empleado;
        return result
      }
      //Vamos a hacer un compare
    } catch (error) {
      // Validar si hay un error, si el error es instancia de error, vamoos a decir error.message
      if(error instanceof Error) throw new InternalServerErrorException(error.message)
      
}
  
  }
  // Ahora haremos un metodo para auntencicarnos
  // Esta funcion recibe el empleadoEntity
  async Login (empleado:empleadoEntity){
    // Crearemos payload que se pasara a nuestro webtoken
    const payload:IpayloadLogin = {userName: empleado.userName, sub:empleado.id}
    // Ahora crearemos una constante llamada token y decir que sera igual al servicio de Jwt
    // Usamos signAsync que es para crear la firma y le pasamos el payload que requiere
    const token = await this.jwtService.signAsync(payload)
    // Retornamos nuestro access token
    return{
      // Opcional retornar empleado
      // Opciona mensaje
      empleado,
      message: 'Bienvenido brouh',
      access_token:token
    }
  }
}
