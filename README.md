<p align="center">
  Uma api simples para catalogar mangás, carrega uma API Restful construída com NestJS (Express) e documentadada com Swagger.
  Feito para banco de dados relacional Postgres integrado com Prisma. </p>

## Como rodar localmente

Instalar dependencias
```bash
$ npm install
```

Configurando ambiente
Crie um arquivo ```.env``` com o parametro DATABASE_URL=

```bash
DATABASE_URL = SUA_URL_PSQL

```


Gerando cliente Prisma e configurando banco de dados. Com o comando abaixo ou semelhante, gere o esquema do banco de dados

```bash
npx prisma migrate dev --name init

```

Agora basta apenas popular os dados
```bash
npx prisma db seed
```

## Compilar e rodar o projeto localmente

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

