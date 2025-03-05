# Cripto Tracker 🚀

Este es un proyecto de **Challenge Técnico** desarrollado con **Next.js 14**. La aplicación permite realizar las siguientes operaciones sin necesidad de un backend real:

1. **Verificar usuarios**.
2. **Generar un nuevo usuario**.
3. **Realizar un CRUD de criptomonedas**.

Dado que no contamos con un backend real, este proyecto utiliza **json-server** para simular una API RESTful y permitir la interacción con la base de datos local.

## Instalación 🔧

Para comenzar a trabajar con este proyecto, sigue estos pasos:

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/anmedina-arg/crypto-proxy-FE-challenge.git
```

### 2. Instalar dependencias

A continuación, instala las dependencias necesarias para el proyecto:

```bash
npm install
```

### 3. Levantar el servidor falso (json-server) 🖥️

Para simular un backend, este proyecto utiliza json-server. Asegúrate de tenerlo instalado:

```bash
npm install json-server --save-dev
```

Luego, para iniciar el servidor de datos, ejecuta el siguiente comando:

```bash
npm run json-server
```

Esto levantará un servidor en http://localhost:4000, donde se simula la API. Es importante verificar que este servidor esté corriendo para poder interactuar correctamente con la aplicación.

Si el servidor corre veras algo como esto en tu consola:

```bash
npm run json-server

> cripto-proxis@0.1.0 json-server
> json-server --watch ./src/utils/db.json --port 4000

--watch/-w can be omitted, JSON Server 1+ watches for file changes by default
JSON Server started on PORT :4000
Press CTRL-C to stop
Watching ./src/utils/db.json...

(˶ᵔ ᵕ ᵔ˶)

Index:
http://localhost:4000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:4000/criptos
http://localhost:4000/users
```

### 4. Levantar el frontend ⚛️

En otra terminal, inicia el servidor de desarrollo de Next.js:

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3000.

### 5. Datos de ejemplo para la autenticación y el CRUD

El archivo `db.json` contiene datos simulados para usuarios y criptomonedas. Cuando inicies la aplicación, podrás verificar usuarios utilizando las credenciales definidas en este archivo.

Ejemplo de los datos:

```json
{
  "criptos": [
    {
      "id": "1",
      "nombre": "Bitcoin",
      "ticker": "BTC",
      "precioCompra": 40000,
      "cantidadComprada": 0.5
    },
    {
      "id": "b90e",
      "nombre": "solana",
      "ticker": "SOL",
      "precioCompra": 1500,
      "cantidadComprada": 1
    },
    {
      "id": "506c",
      "nombre": "mariaCoin",
      "ticker": "MRC",
      "precioCompra": 123123,
      "cantidadComprada": 123
    }
  ],
  "users": [
    {
      "id": "1",
      "username": "usuario1",
      "password": "password123",
      "token": "fake-jwt-token-1"
    },
    {
      "id": "2",
      "username": "usuario2",
      "password": "password456",
      "token": "fake-jwt-token-2"
    },
    {
      "id": "06c2",
      "username": "catalina",
      "password": "123"
    }
  ]
}
```

Importante: Como los datos de usuarios y criptomonedas se pueden modificar, asegúrate de usar un usuario válido para realizar el login. Los usuarios están definidos en el archivo db.json, por lo que puedes verificar que el login funcione correctamente.

### 6. Uso de la aplicación

Una vez que hayas seguido los pasos anteriores y ambas aplicaciones (frontend y json-server) estén corriendo, podrás:

- Verificar usuarios usando el formulario de login.
- Verificar rutas protegidas, la ruta `/crypto` y todas las rutas relacionadas a ese path, estan protegidas, si intentas navegar mediante la barra de direcciones, te redirige al login.
- Generar nuevos usuarios para poder iniciar sesión.
- Ver un listado con las criptomonedas.
- Modificar precio de compra y cantidad de alguna cripto (No puse modificar el nombre ni el ticker porque son datos duros de la cripto, no deberian cambiar)
- Agregar una cripto personal.
- Eliminar criptos del listado de criptomonedas.

Tecnologías utilizadas 🚀

- **Next.js 14** - Framework para la aplicación frontend.
- **React** - Biblioteca de JavaScript para construir interfaces de usuario.
- **React Query** - Librería para gestionar el estado de las solicitudes de datos (fetching, caching, sincronización, etc.) de manera eficiente. Se usa en este proyecto para interactuar con la API simulada y mantener el estado de los datos de las criptomonedas y los usuarios.
- **json-server** - Para simular una API RESTful sin necesidad de un backend real.
- **styled-components** - Para dar estilos a los componentes.
