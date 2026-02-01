# Project Ibero

Una app sencilla con dos partes:

- **server**: API en Node/NestJS con base de datos PostgreSQL usando Prisma.
- **client**: Frontend en React + Vite + Tailwind.

La idea es que cualquiera pueda correrlo rápido, sin Docker, con datos listos para entrar.

---

## Requisitos

- Node.js 20 o superior
- PostgreSQL 14+ en tu máquina

---

## Paso 1: Clonar y preparar variables

1. Clona este repositorio.
2. Crea tus variables de entorno:
   - Copia `server/.env.example` a `server/.env` y revisa la `DATABASE_URL` y `PORT`.
   - Copia `client/.env.example` a `client/.env.local`.

Si no tienes creada la base, puedes ajustar `DATABASE_URL` para usar tu usuario/clave y nombre de base preferido.

---

## Paso 2: Instalar dependencias

- Backend
  - Abre una terminal en `server` y ejecuta: `npm install`
- Frontend
  - Abre otra terminal en `client` y ejecuta: `npm install`

---

## Paso 3: Preparar la base de datos (sin Docker)

1. Asegúrate de que PostgreSQL está corriendo y de que la `DATABASE_URL` de `server/.env` es correcta.
2. Desde la carpeta `server` ejecuta:
   - `npm run db:generate` (genera el cliente de Prisma)
   - `npm run db:push` (crea/actualiza tablas)
   - `npm run db:seed` (carga datos iniciales)

Esto creará un usuario de prueba y algunos contactos.

- Usuario: `userPrueba1`
- Contraseña: `1212`

> Si ya existe el usuario, el seed lo detecta y no lo duplica.

---

## Paso 4: Ejecutar la app

- Backend (API)
  - En `server`: `npm run start:dev`
  - La API corre por defecto en `http://localhost:3000`

- Frontend (web)
  - En `client`: `npm run dev`
  - La web corre en `http://localhost:5173` (o el puerto que muestre Vite)

Asegúrate de que `client/.env.local` tenga `VITE_API_BACKEND=http://localhost:3000`.

---

## ¿Qué incluye?

- Autenticación básica con usuario de prueba.
- API con NestJS y Prisma (modelos `Empleado`, `Contact`, `Area`).
- Frontend en React con axios configurado a la URL de la API.

---

## Estructura

- `server/`: NestJS + Prisma
- `server/prisma/schema.prisma`: modelos de la base
- `server/prisma/seed.ts`: datos iniciales
- `client/`: React + Vite + Tailwind
- `client/src/config/axios-config.ts`: base URL y headers para la API

---

## Comandos útiles

- Server
  - `npm run start:dev`: levanta la API en modo desarrollo
  - `npm run db:generate`: genera el cliente de Prisma
  - `npm run db:push`: aplica el esquema a la base
  - `npm run db:seed`: carga datos iniciales

- Client
  - `npm run dev`: levanta el sitio
  - `npm run build`: build de producción

---

## Problemas comunes

- Error de conexión a la base: revisa `DATABASE_URL` y que PostgreSQL esté encendido.
- No puedes entrar: ejecuta `npm run db:seed` en `server` para recrear el usuario de prueba.

---

## Cómo contribuir

- Crea una rama desde `main` y abre un PR con cambios pequeños y claros.
- Usa mensajes de commit descriptivos (ver más abajo).

---

## Publicar en GitHub (historial limpio y claro)

El `server` venía con un `.git` propio. Para tener un solo repositorio en la raíz:

1. Borra el `.git` interno del `server`:
   - Windows (PowerShell o CMD): `rmdir /S /Q server\.git`
2. Inicializa git en la raíz del proyecto:
   - `git init`
   - `git add .`
   - Crea commits lógicos (ejemplos):
     - `chore: initialize monorepo with client and server`
     - `feat(server): prisma schema and nest setup`
     - `feat(client): react + vite + tailwind base`
     - `chore(server): add prisma seed and db scripts`
     - `docs: add friendly README and env examples`
   - Crea un repo en GitHub y agrega el remoto:
     - `git remote add origin <URL_DE_TU_REPO>`
     - `git branch -M main`
     - `git push -u origin main`

> Si prefieres un solo commit inicial, puedes hacerlo, pero recomendamos commits por partes para mayor claridad.

---

## Licencia y Copyright

Copyright © 2026, Junior Herrera - Project Ibero.

Este proyecto se distribuye con fines educativos y demostrativos. Puedes leer, usar y adaptar el código respetando el aviso de copyright anterior. Si reutilizas este proyecto, agradecemos la atribución.
