import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  async validate(username: string, password: string) {
    console.log(username, password);
    const user = this.userService.find(username);
    if (user && user.name === username) {
      return user;
    }
    return null;
  }

  // 生成token
  async getToken(username: string, password: string) {
    return this.jwtService.sign({ username, password });
  }
}
