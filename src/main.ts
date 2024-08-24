import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
 //import { AllExceptionsFilter } from './common/AllExceptionsFilter';
 import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 //app.useGlobalFilters(new AllExceptionsFilter());
 //app.useGlobalPipes(new ValidationPipe());

//  //Cors
//   app.enableCors();

//   app.enableCors({
//     origin: 'http://localhost:3000', 
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     allowedHeaders: 'Content-Type, Authorization',
//     credentials: true,
//   });
//  //over

 //Validation
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transform: true,
      whitelist: true,
    }),
  );
  //over

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('CRM API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('CRM') 
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
