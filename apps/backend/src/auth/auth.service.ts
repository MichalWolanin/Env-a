import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
    
    async googleLogin(req: Request, res: Response) {
        console.log(req.user);
        const userTempId = uuidv4();
        await this.cacheManager.set(
            `temp-google-user__${userTempId}`,
            req.user,
            10000,
        );

        setTimeout(async () => {
            const googleUser = await this.cacheManager.get(
                `temp-google-user__${userTempId}`,
            );
            console.log(`user after 9s: ${JSON.stringify(googleUser)}`);
        }, 9000);

        setTimeout(async () => {
            const googleUser = await this.cacheManager.get(
                `temp-google-user__${JSON.stringify(userTempId)}`,
            );
            console.log(`user after 11s: ${googleUser}`);
        }, 11000);

        return null;
    }
}
