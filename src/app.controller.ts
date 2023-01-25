import { Controller, Get } from '@nestjs/common';
import { ServiceB } from './service-B';

@Controller()
export class AppController {
  constructor(
    private readonly serviceB: ServiceB,
  ) { }

  @Get()
  getHello(): string {
    return process.env.DATABASE_HOST
  }

  @Get('/serviceB')
  getHelloC(): string {
    return this.serviceB.getHello();
  }
}
