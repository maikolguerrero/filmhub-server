# filmhub-server
Backend en Node.js con Express para la aplicación de una Single Page Application (SPA) de películas. Proporciona la funcionalidad de autenticación, gestión de películas y comunicación con la base de datos. El cliente frontend que se complementa con este servidor se encuentra en este repositorio: [filmhub-client](https://github.com/maikolguerrero/filmhub-client)

## Demostración
Aquí tienes un video de YouTube que muestra una demostración de la aplicación:
[![App con React y React Router](https://i9.ytimg.com/vi/_77GlIl4PgA/mqdefault.jpg?sqp=CMiZgqUG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFEgXihlMA8=&rs=AOn4CLAJ1shmPZFt9yiTFwvX_fDiBpfv0Q)](https://youtu.be/8sba_KJv41Q)

## Características
- Gestión de películas y sus detalles, como título, imágen, sinopsis, actores, directores, género, fecha.
- Funcionalidad CRUD de películas, géneros, admins, y reviews.
- Funcionalidad de búsqueda y filtrado de películas.
- Funcionalidad para guardar imágenes.
- Comunicación con una base de datos MySQL.
- Autenticación de usuarios y gestión de roles de administrador.
- Uso de JSON Web Tokens (JWT) para la autenticación y autorización.
- Documentación con Swagger.

## Tecnologías utilizadas
- JavaScript
- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- Swagger

## Instalación
- **1.** Clona el repositorio:
```
git clone https://github.com/maikolguerrero/filmhub-server.git
```
- **2.**  Ingresa al directorio del proyecto:
```
cd filmhub-server
```
- **3.**  Instala las dependencias:
```
npm install
```
- **4.**  Importa la base de datos MySQL que se encuentra en la carpeta `db`.
- **5.** Configura las variables de entorno en un archivo `.env`. Puedes basarte en el archivo `.env.example` proporcionado.

## Uso
- **1.** Ejecuta la aplicación: 
```
npm start
```
- **2.**  El servidor estará escuchando en el puerto definido en la variable de entorno `PORT`.
- **3.**  Utiliza las rutas y métodos HTTP definidos en el servidor para interactuar con los admins, películas, géneros y reviews.
