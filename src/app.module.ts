import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ApiController } from './api/api.controller';
import { BaseService } from './base-service';
import { ServiceA } from './service-A';
import { ServiceB } from './service-B';
import { AppController } from './app.controller';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './logging/logger.middleware';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true,
    }),
    // TypeOrmModule을 동적모듈로 가져오고
    TypeOrmModule.forRoot({
      type: 'postgres', //  쓰고자 하는 Db를 설정
      host: process.env.DATABASE_HOST, // 밑에 설정하는 값들은 DB설정 시 기본적으로 쓰는 것들
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'nest_practice_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 소스 코드 내에서 TypeOrm이 구동될 때 인식할 엔티티 클래스의 경로, 라라벨 기준 모델파일들 개념
      synchronize: true, // 서비스 구동 시 소스 코드 기반으로 데이터베이스 스키마를 동기화 할 지 여부 - 프로덕션에서는 절대 true로 사용하면 안되
    }),
    UsersModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [ApiController, AppController],
  providers: [BaseService, ServiceA, ServiceB, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // 미들웨어를 어디에 적용할 지 관리하는 것, exclude로 제외할 수도 있음
    consumer.apply(LoggerMiddleware).forRoutes('/users');
  }
}
