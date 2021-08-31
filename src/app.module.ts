import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { HelloModule } from './modules/hello/hello.module';
import { UserModule } from './modules/user/user.module';
import { UsergitModule } from './add/usergit/usergit.module';

@Module({
  imports: [HelloModule, UserModule, AuthModule, UsergitModule],
})
export class AppModule {}
