import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '000555', // Debe coincidir con el secreto definido en JwtModule
    });
  }

  async validate(payload: any) {
    // Aquí puedes agregar lógica adicional para verificar el usuario
    return { userId: payload.sub, username: payload.username };
  }
}
