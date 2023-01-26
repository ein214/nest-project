import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './dto/userInfo';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ulid } from 'ulid';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private dataSource: DataSource,
    private authService: AuthService,
  ) {}

  async createUser(name: string, email: string, password: string) {
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입할 수 없습니다.',
      );
    }

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    //await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private checkUserExists(email: string) {
    const user = this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    return user !== undefined;
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: {
        signupVerifyToken: signupVerifyToken,
      },
    });

    if (!user) {
      throw new NotFoundException('해당 이메일로 가입한 사용자가 없습니다.');
    }

    return this.authService.login({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }용

  async login(email: string, password: string): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new NotFoundException('해당 이메일로 가입한 사용자가 없습니다.');
    }

    return this.authService.login({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('해당 이메일로 가입한 사용자가 없습니다.');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new UserEntity();
    user.id = ulid();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.usersRepository.save(user);
  }

  private async saveUserUsingQueryRunner(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect(); // queryrunner에서 DB를 연결하고
    await queryRunner.startTransaction(); // transaction을 시작

    try {
      const user = new UserEntity();
      user.id = ulid();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;
      await queryRunner.manager.save(user); // queryrunner를 통해 저장

      await queryRunner.commitTransaction(); // 트랜잭션을 커밋하여  DB에 반영, 영속화?? Persistence
    } catch (err) {
      await queryRunner.rollbackTransaction(); // 저장하다 오류가 나면 롤백
    } finally {
      await queryRunner.release(); // queryrunner를 해제
    }
  }
}
