import { AuthModule } from './auth/auth.module';
import { AuthUtilsModule } from './auth-utils/auth-utils.module';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { UsersModule } from "./users/users.module";
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from "@nestjs/mongoose";
import config from "../config";
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    AuthModule,
    AuthUtilsModule,
    UsersModule, 
    CommentsModule,
    PassportModule,
    CacheModule.register({
      ttl: 10,
      max: 100000,
      isGlobal: true,
    }),
    MongooseModule.forRoot(config.mongodbUri),
  ],
  controllers: [
    AppController],
  providers: [ 
    AppService,
  ],
})
export class AppModule {
}

