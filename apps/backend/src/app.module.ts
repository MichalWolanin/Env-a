import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from "./users/users.module";
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from "@nestjs/mongoose";
import config from './config';
import { CustomStrategy } from './auth/auth.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    CommentsModule,
    MongooseModule.forRoot(config.mongodbUri),
    PassportModule.register({ defaultStrategy: 'custom' }),
  ],
  controllers: [AppController],
  providers: [AppService, CustomStrategy],
})
export class AppModule {}
