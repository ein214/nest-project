import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEntity } from './infra/db/entities/user.entity';
import { UsersController } from './interface/users.controller';
import { UserEventsHandler } from './application/event/user-events.handler';
import { UserRepository } from './infra/db/repository/UserRepository';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([UserEntity]), //  유저 모듈내에서 사용할 저장소를 등록
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserEventsHandler,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UsersModule {}
