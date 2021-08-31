import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtContants } from './jwt.contants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 获取请求header token值
      // 为什么用的是header里的token字段的原因
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: jwtContants.secret,
    });
  }

  async validate(payload: any) {
    //payload：jwt-passport认证jwt通过后解码的结果
    return { username: payload.username, id: payload.sub };
  }
}