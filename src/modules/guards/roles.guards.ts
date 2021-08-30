import { Injectable, CanActivate, ExecutionContext, Body, Query } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 通过反射得到当前方法的注解内容
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    
    
    const request = context.switchToHttp().getRequest();
    const user = request.body.roles;
    if (!user) return false;
    // 这里为了方便不写真实逻辑
    return roles.includes(user);
  }
}