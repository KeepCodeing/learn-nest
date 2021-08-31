import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // 注意这里权限验证的策略：首先username和password是直接从request的body
  // 解析出来的，也就是想要进行验证至少得提供这两个字段...
  // 此外username+password的验证形式其实也是守卫，但是它不需要像之前角色
  // 验证那样自己手写，直接通过轮子提供的方法就可以调用了。这里使用的策略是
  // local策略，从继承的对象就可以看出来，那么实现用户名密码验证的步骤其实
  // 就是下面几步：
  // 1. 定义一个登陆接口，该接口的body中的键要和验证函数中的一致，否则
  // 验证不会进行
  // 2. 在该路由上加上local验证策略守卫
  // 3. 定义LocalStrategy类，实现它里面的validate方法
  // 4. 实现验证逻辑（service）
  // 5. 返回token（取决于登陆是否成功）

  // 各个模块互相调用的注意点：controller在那个模块用到了就到那个模块的
  // controllers下面引入；service在那个模块用到了就到那个模块的providers
  // 下引入，注意这里LocalStrategy也是service，而且它不属于任何用户定义
  // 的模块，它是轮子提供的模块，所以必须引入

  // 最后：验证函数要做的也只有验证，生成token返回前端是service负责的，
  // 验证失败返回就会被自动终止

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}