 import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';

@Module({
    imports: [],
    controllers: [],
    providers: [GoogleStrategy],
})
export class AuthUtilsModule {}
