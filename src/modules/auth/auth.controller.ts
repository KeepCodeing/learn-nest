import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  // jwt验证守卫，注意这里header里是用token字段，而不是Auth那个字段
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserList() {
    return "hello jwt";
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() request) {
    return this.authService.getToken(
      request.body.username,
      request.body.password,
    );
  }
}
