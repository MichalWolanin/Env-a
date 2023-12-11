import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationErrorFilter } from './mongo-validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  app.useGlobalFilters(new ValidationErrorFilter());
  await app.listen(3000);
}
bootstrap();
