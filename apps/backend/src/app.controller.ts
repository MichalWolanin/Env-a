import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './services/app.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/hello')
  getHello(@Req() request: Request): string {
    return 'Hello ' + JSON.stringify(request['user']) + '!';
  }
}
