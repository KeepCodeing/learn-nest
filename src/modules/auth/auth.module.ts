import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtContants } from './jwt.contants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    // 这里JWTService似乎不需要引入，而是通过import注册
    JwtModule.register({
      secret: jwtContants.secret,
    }),
  ],
  // JWT验证和密码用户名验证一样需要引入
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
