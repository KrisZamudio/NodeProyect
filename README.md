# Sistema de administración de empleados

Proyecto final de la materia de Node.js.

Sistema para el departamento de recursos humanos de la empresa **Taller de Node.js S.A. de C.V.**, que sustituye el documento de Excel donde se guardaban los datos de los empleados. Solo los usuarios dados de alta en la base de datos pueden iniciar sesión y administrar la información.

## ¿Qué hace?

- Inicio de sesión con autenticación por **JWT**.
- Solo los usuarios autenticados pueden ver y modificar los datos.
- Agregar empleados.
- Consultar empleados.
- Buscar empleados por nombre.
- Modificar los datos de un empleado.
- Eliminar empleados.

De cada empleado se guarda: nombre, apellidos, teléfono, correo electrónico y dirección.

## Tecnologías

- Node.js
- Express.js
- MySQL
- JSON Web Token (`jsonwebtoken`)
- bcrypt (para guardar las contraseñas cifradas)
- dotenv (variables de entorno)
- HTML, CSS y JavaScript para las pantallas

## Requisitos

- Node.js instalado
- MySQL (por ejemplo con XAMPP y phpMyAdmin)

## Cómo instalarlo

1. Clona el repositorio:

   ```bash
   git clone URL_DE_TU_REPOSITORIO
   cd NOMBRE_DE_LA_CARPETA
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea la base de datos:
   - En phpMyAdmin crea una base de datos llamada `empleados_db`.
   - Entra a ella, abre la pestaña **Importar** y selecciona el archivo `database.sql`.

4. Crea el archivo `.env` en la raíz del proyecto (puedes copiar `.env.example`) y llena los valores:

   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_DATABASE=empleados_db
   JWT_SECRET=************
   ```

5. Inicia el servidor:

   ```bash
   npm start
   ```

6. Abre en el navegador: `http://localhost:3000`

## Usuario para entrar

| Usuario | Contraseña |
|---------|------------|
| admin   | admin123   |

Los usuarios del sistema se dan de alta directamente en la base de datos (tabla `usuarios`), con la contraseña cifrada con bcrypt.

## Pantallas

- **Login** (`index.html`): inicio de sesión.
- **Empleados** (`empleados.html`): lista de empleados, buscador, y botones para editar y eliminar.
- **Registro** (`registro.html`): formulario para agregar o editar un empleado.

## Rutas de la API

Todas las rutas de `/empleados` necesitan el token en el header:

```
Authorization: Bearer TU_TOKEN
```

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/login` | Inicia sesión y regresa el token (no necesita token) |
| GET | `/empleados` | Lista todos los empleados |
| GET | `/empleados?nombre=ana` | Busca empleados por nombre |
| GET | `/empleados/:id` | Consulta un empleado por su id |
| POST | `/empleados` | Agrega un empleado |
| PUT | `/empleados/:id` | Modifica un empleado |
| DELETE | `/empleados/:id` | Elimina un empleado |

Ejemplo de body para `POST /login`:

```json
{
  "usuario": "admin",
  "password": "admin123"
}
```

Ejemplo de body para `POST /empleados` y `PUT /empleados/:id`:

```json
{
  "nombre": "Marta",
  "apellidos": "Ruiz Soto",
  "telefono": "3456789101",
  "correo": "marta@gmail.com",
  "direccion": "Av. Central 10, Queretaro"
}
```

## Estructura del proyecto

```
├── config/
│   └── database.js
├── middleware/
│   └── auth.js
├── public/
│   ├── index.html
│   ├── empleados.html
│   ├── registro.html
│   ├── script.js
│   └── style.css
├── routes/
│   ├── login.js
│   └── empleados.js
├── database.sql
├── index.js
└── package.json
```

## Autor

Kristal Herandy Zamudio Chavez — Universidad Autónoma de Querétaro
