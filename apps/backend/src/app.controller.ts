import { Controller, Get, Req } from '@nestjs/common';

import { AppService } from './services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/hello')
  getHello(@Req() request: Request): string {
    return 'Hello' + request['user']?.email + '!';
  }
}
