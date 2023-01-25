import { ServiceA } from './service-A';
import { Inject } from "@nestjs/common";

export class BaseService {
  //constructor(private readonly serviceA: ServiceA) {} // 생성자 기반
  @Inject(ServiceA) private readonly serviceA: ServiceA// 속성 기반

  getHello(): string {
    return 'Hello World BASE!';
  }

  doSomethingFromA(): string {
    return this.serviceA.getHello();
  }
}
