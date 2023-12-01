import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
    
    async googleLogin(req: Request, res: Response) {
        const userTempId = uuidv4();
        await this.cacheManager.set(
            `temp-google-user__${userTempId}`,
            req.user,
            10000,
        );
        return null;
    }
}
