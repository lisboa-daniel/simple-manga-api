import { NestFactory, HttpAdapterHost } from '@nestjs/core';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  // Criando configurações do Swagger
  const config = new DocumentBuilder()
    .setTitle('Manga API') 
    .setDescription('Manga API description') 
    .setVersion('0.1') 
    .build(); 

  // Cria documento swagger
  const document = SwaggerModule.createDocument(app, config);

  // Inicia modulo swagger

  SwaggerModule.setup('api', app, document);

  //Exceptions Handler
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
