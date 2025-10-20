import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  // Criando configurações do Swagger
  const config = new DocumentBuilder()
    .setTitle('Manga API') 
    .setDescription('Manga API description') 
    .setVersion('0.1') 
    .build(); 

  // Cria documento swagger
  const document = SwaggerModule.createDocument(app, config);

  // Inicia modulo
  SwaggerModule.setup('api', app, document);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
