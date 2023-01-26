import { Controller, Get, UseGuards } from "@nestjs/common";
import { ServiceB } from './service-B';
import { AuthGuard } from "./auth.guard";

@UseGuards(AuthGuard) // Guard를 적용
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
