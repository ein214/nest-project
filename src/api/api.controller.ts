import { Controller, Get } from "@nestjs/common";

@Controller({ host: 'api.localhost'}) // 하위 도메인을 설정할 수 있음
export class ApiController {
  @Get()
  index() {
    return 'Hello Api';
  }
}
