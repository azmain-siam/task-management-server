/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { swaggerConfig, swaggerCustomOptions } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
  });
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new LoggingInterceptor());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  // Auto-add security to all endpoints
  document.paths = Object.fromEntries(
    Object.entries(document.paths).map(([path, ops]) => [
      path,
      Object.fromEntries(
        Object.entries(ops).map(([method, op]) => [
          method,
          {
            ...op,
            security: [{ 'access-token': [] }],
          },
        ]),
      ),
    ]),
  );
  SwaggerModule.setup('api/docs', app, document, swaggerCustomOptions);
  // Static files
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/uploads/',
  });

  app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on port: ${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
