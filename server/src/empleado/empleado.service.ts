import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { empleadoEntity } from './empleado.entity';
import { CreateEmpleadoDto } from 'src/database/dto/empleado.create.dto';
import * as bcrypt from 'bcrypt' 
@Injectable()
export class EmpleadoService {
  // Crear constructor y agregar el uso del servicio que suaremos (prisma)
  // Crear un nuevo servicio que buscara empleados pero estos se buscaran solo por el userbname
  constructor(private readonly prisma: PrismaService) {}

  // Crear función que recibe un userName de tipo string
  async findOneEmpleado(
    userName: string,
  ): Promise<empleadoEntity | null | undefined> {
    try {
      //Almacenamos en una variable constante llamada empleado lo que devuleva prisma de la tabla empleado
      // Usamos findFirst porque userName no está marcado como @unique en el schema
      // Usamos Where para buscar por userName
      const empleado = await this.prisma.empleado.findFirst({
        where: {
          userName,
        },
      });
      // Validaremos si ese usuario es null o no
      if (empleado) {
        return empleado;
      }
      return null;
    } catch (error) {
      // Tipamos el error correctamente para evitar "Unsafe return of a value of type any"
      if (error instanceof Error) {
        throw error;
      }
      // Usamos ErrorOptions con cause para pasar el error original
      throw new Error('Error desconocido al buscar empleado', {
        cause: error,
      });
    }
  }
  // Servicio createUser, hara el metodo que permite crear nuestros usuarios
  // usamos el DTO creado
  async createEmpleado(body:CreateEmpleadoDto): Promise<empleadoEntity | undefined>{
    try {
      //Corroborar si existe el name
      const validation = await this.prisma.empleado.findFirst({
        where:{
          userName: body.userName
        }
      })
      if(validation) throw new BadRequestException('Este usuario ya esta en uso')

      // Generar un numero de salto
      const salt = await bcrypt.genSalt()
      // generar hasg
      const hash = await bcrypt.hash(body.password, salt)
      // Crear un nuevo usuario
      const newEmpleado = await this.prisma.empleado.create({
        data:{
          name:body.name,
          userName:body.userName,
          password: hash
        }
      })
      // Hacer destructuring para no enviar la password
      const {password, ... result} = newEmpleado
      return result;
      
    } catch (error) {
      if(error instanceof BadRequestException) throw new BadRequestException(error.message)
      if(error instanceof Error){
        throw new InternalServerErrorException(error.message)
      }
      
    }
  }

  // Metodo que nos ayude a obtener un usuario por su Id
  async getEmpleadoById (empleadoId: number): Promise<empleadoEntity | undefined>{
    try {
      const empleado = await this.prisma.empleado.findUnique({
        where:{
          id: empleadoId,
        },include:{
          contacts:true,
        }

      })
      if(!empleado) throw new NotFoundException('Empleado Not Found');
      const {password, ...results} = empleado
      return results
      
    } catch (error) {
      if(error instanceof NotFoundException){
        throw new NotFoundException(error.message)
      }
      if(error instanceof Error){
        throw new InternalServerErrorException(error.message)
      }
      
    }
  }
}
