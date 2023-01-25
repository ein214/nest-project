import { Injectable } from '@nestjs/common';
import { BaseService } from './base-service';
import { ServiceA } from "./service-A";

@Injectable()
export class ServiceB extends BaseService {
  // 속성기반으로 할 때는 주석처리
  // constructor(private readonly _serviceA: ServiceA) {
  //   super(_serviceA);
  // }

  getHello(): string {
    return this.doSomethingFromA();
  }
}
