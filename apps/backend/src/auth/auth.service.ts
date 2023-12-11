import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

interface IUser {
    accessToken: string;
}

@Injectable()
export class AuthService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async googleRedirect(req: Request, res: Response) {
        const userTempId = uuidv4();
        await this.cacheManager.set(
            `temp-google-user__${userTempId}`,
            req.user,
            10000,
        );
        const user = req.user as IUser;

        res.redirect(`http://localhost:4200/#/auth/login?id=${user.accessToken}`);
    }

    async googleLogin(req: Request) {
        const authorization = req.get('authorization');
        if (!authorization) throw new UnauthorizedException();

        const userTempId = authorization.replace('Bearer ', '');
        if (!uuidValidate(userTempId)) throw new UnauthorizedException();

        const googleUser = await this.cacheManager.get(
            `temp-google-user__${userTempId}`,
        );

        await this.handleDatabaseUser();

        return googleUser;
    }

    handleDatabaseUser() {
        throw new Error('Method not implemented.');
    }
}