import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { UsersModule } from "./users/users.module";
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from "@nestjs/mongoose";
import config from "../config";
import { PreauthMiddleware } from './auth/preauth.middleware';

@Module({
  imports: [
    UsersModule,
    CommentsModule,
    MongooseModule.forRoot(config.mongodbUri),
  ],
  controllers: [
    AppController],
  providers: [
    AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(PreauthMiddleware).forRoutes({
        path: '*', method: RequestMethod.ALL
      });
  }
 }
