import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
 //import { AllExceptionsFilter } from './common/AllExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 //app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalPipes(new ValidationPipe());

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
