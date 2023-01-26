import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
//import { ValidationPipe } from "./validation.pipe";
import { ValidationPipe } from '@nestjs/common';
import { logger3 } from "./logging/logger.middleware"; // 내장되어있는 전역 validation 파이프

// import * as dotenv from 'dotenv';
// import * as path from 'path';

// dotenv.config({
//   path: path.resolve(
//     (process.env.NODE_ENV === 'production') ? '.production.env'
//       : (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.development.env'
//   )
// })

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 파이프를 전역으로 지정할 경우 - 미들웨어는 이게 안됨
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(logger3)
  await app.listen(3000);
}
bootstrap();
