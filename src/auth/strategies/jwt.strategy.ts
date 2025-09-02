import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor( private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // lee el token del header Authorization
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'keySecret',
        });
    }

    async validate(payload: any) {
        // el payload viene del token
        return { userId: payload.sub, email: payload.email, role: payload.role }; // se asigna a request.user
    }
}
