import { UserInfo } from '../../interface/userInfo';

export interface IUserRepository {
  findByEmail: (email: string) => Promise<UserInfo>;
  save: (
    id: string,
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) => Promise<void>;
}
