import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './dto/userInfo';
import { ValidationPipe } from '../validation.pipe';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './command/create-user.command';
import { GetUserInfoQuery } from "./query/get-user-info.query";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  async createUser(@Body(ValidationPipe) dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;

    const command = new CreateUserCommand(name, email, password);

    return this.commandBus.execute(command);
    //await this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Body() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;
    return await this.usersService.login(email, password);
  }

  // @Param 의 두번째 인자값에 파이프로 형변환이나 유효성 체크
  // HttpStatus로 사용가능한 에러코드가 정의되어있음
  // async getUserInfo(@Param('id', ParseIntPipe) userId: string): Promise<UserInfo> {
  //   return await this.usersService.getUserInfo(userId);
  // }
  // async getUserInfo(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({
  //       errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
  //     }),
  //   )
  //   userId: string,
  // ): Promise<UserInfo> {
  //   return await this.usersService.getUserInfo(userId);
  // }
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserInfo(
    @Headers() headers: any,
    @Param('id') userId: string,
  ): Promise<UserInfo> {
    const getUserInfoQuery = new GetUserInfoQuery(userId);
    return this.queryBus.execute(getUserInfoQuery);
  }

  @Get()
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(offset, limit);
    return [];
  }
}
