import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{

  // Prisma client methods wrappers to appease the TypeScript compiler
  // (some project setups produce generated types that the editor doesn't pick up)
  async $connect(): Promise<void> {
    // Call the base PrismaClient method directly to avoid TS complaints about `super` casts
    return (PrismaClient.prototype as any).$connect.call(this);
  }

  async $disconnect(): Promise<void> {
    // Call the base PrismaClient method directly to avoid TS complaints about `super` casts
    return (PrismaClient.prototype as any).$disconnect.call(this);
  }

  /**
   * Método que se ejecuta cuando el módulo se inicializa.
   * Conecta a la base de datos al iniciar el módulo.
   */
  async onModuleInit() {
    try {
      // Conecta a la base de datos al iniciar el módulo
      await this.$connect();
      console.log('✅ Base de datos conectada correctamente');
    } catch (error) {
      if (error instanceof Error) console.error('Error connecting to database:', error.message);
      else console.error('Unexpected error connecting to database:', error);
    }
  }

  /**
   * Método que se ejecuta cuando el módulo se destruye.
   * Cierra la conexión al apagar el servidor.
   */
  async onModuleDestroy() {
    try {
      // Cierra la conexión al apagar el servidor
      await this.$disconnect();
    } catch (error) {
      console.error('Error disconnecting from database:', error);
    }
  }
}
