<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Ejecución en desarrollo

1. Clonar el repositorio
2. Ejecutar el comando

```
yarn install
```

3. Tener NestCLI instalado

```
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker-compose up
```

5.  Reconstruir la base de datos con la semilla

```
curl --location 'localhost:3000/api/v2/seed'
```

6. Clonar el archivo `.env.template` y renombrar la copia `.env`

7. Llenar las variables de entorno en el `.env``

8. Ejecutar la aplicacion en dev
   ```
   yarn start:dev
   ```

## Stack Utilizado

- MongBD
- NestJS
