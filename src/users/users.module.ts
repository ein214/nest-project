import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailModule } from "../email/email.module";
import { UserEntity } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([UserEntity])  //  유저 모듈내에서 사용할 저장소를 등록
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
