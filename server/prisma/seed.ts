import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const username = 'userPrueba1';
  const password = '1212';

  const existing = await prisma.empleado.findFirst({ where: { userName: username } });
  if (existing) {
    console.log('Seed: usuario ya existe, saltándose creación:', username);
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const empleado = await prisma.empleado.create({
    data: {
      name: 'Usuario de Prueba',
      userName: username,
      password: hash,
    },
  });

  // Crear algunos contactos de ejemplo
  await prisma.contact.createMany({
    data: [
      {
        name: 'Contacto 1',
        lastName: 'Prueba',
        email: 'contact1@example.com',
        phone: '123456789',
        address: 'Calle Falsa 123',
        empleadoId: empleado.id,
      },
      {
        name: 'Contacto 2',
        lastName: 'Prueba',
        email: 'contact2@example.com',
        phone: '987654321',
        address: 'Avenida Siempre Viva 742',
        empleadoId: empleado.id,
      },
    ],
  });

  console.log('Seed: usuario creado:', username);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
