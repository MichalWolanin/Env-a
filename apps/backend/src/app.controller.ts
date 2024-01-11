import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(AuthGuard())
  @Get('/private')
  privateEndpoint(@Request() request) {
    console.log('User id', request.user.uid);
    return this.appService.getData();
  }
}
