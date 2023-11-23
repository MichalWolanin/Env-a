import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { UsersModule } from "./users/users.module";
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from "@nestjs/mongoose";
import config from "../config";

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
export class AppModule { }
