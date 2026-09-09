# 🦁 ZooAPI

Backend y frontend de un zoológico ficticio, desarrollado como material de práctica para la ayudantía del ramo de Ingeniería de Software. Permite gestionar especies, recintos, animales y comentarios de visitantes.

## 🧱 Stack

**Backend**
- Node.js + Express
- PostgreSQL + Prisma ORM
- Zod (validaciones)
- Faker (datos de ejemplo)

**Frontend**
- React + Vite
- Hooks (`useState`, `useEffect`)
- Fetch API (integración REST)

## 📁 Estructura del proyecto

```
ZooAPI/
├── backend/
│   ├── src/
│   │   ├── config/         # conexión a Prisma
│   │   ├── controllers/    # lógica de cada endpoint
│   │   ├── middlewares/    # validación y manejo de errores
│   │   ├── routes/         # definición de rutas REST
│   │   ├── schemas/        # esquemas Zod de validación
│   │   └── services/       # acceso a datos vía Prisma
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.js
│   └── index.js
└── frontend/
    ├── src/
    │   ├── api/             # configuración de la URL del backend
    │   ├── components/      # EspecieList, RecintoList, AnimalCatalogo
    │   ├── App.jsx
    │   └── main.jsx
    └── index.html
```

## ⚙️ Requisitos previos

- Node.js 18+
- PostgreSQL corriendo localmente (o accesible por red)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd ZooAPI
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita `.env` con los datos de tu base de datos PostgreSQL:

```
DATABASE_URL="postgresql://usuario:password@localhost:5432/zooapi?schema=public"
PORT=3000
```

Luego:

```bash
npx prisma migrate dev
npx prisma db seed
npm run dev
```

El servidor queda disponible en `http://localhost:3000`. Verifica que `GET http://localhost:3000/api/animals` devuelva datos.

### 3. Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Se abre en `http://localhost:5173`. Si cambiaste el puerto del backend, actualiza `API_URL` en `frontend/src/api/config.js`.

## 📡 Endpoints principales

| Método | Ruta                          | Descripción                                  |
|--------|-------------------------------|-----------------------------------------------|
| GET    | `/api/especies`                | Lista especies (con conteo de animales)       |
| GET    | `/api/recintos`                | Lista recintos (con conteo de animales)       |
| GET    | `/api/animals`                 | Lista animales (filtros: `especieId`, `recintoId`) |
| GET    | `/api/animals/:id`             | Detalle de un animal                          |
| POST   | `/api/animals`                 | Crea un animal                                |
| PUT    | `/api/animals/:id`             | Actualiza un animal                           |
| DELETE | `/api/animals/:id`             | Elimina un animal                             |
| GET    | `/api/animals/:id/comments`    | Comentarios de un animal + calificación promedio |
| POST   | `/api/animals/:id/comments`    | Crea un comentario (`autor`, `calificacion` 1-5, `comentario` mín. 10 caracteres) |

