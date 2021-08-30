import { GlobalExceptionFilter } from './modules/exceptions/http-exception';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  app.useGlobalFilters(new GlobalExceptionFilter());

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Swagger API')
    .setDescription('This is a project created by nestjs and Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);

  // 注意端口监听要写在最后面，否则前面装载的模块可能没有加载成功?
  await app.listen(1919);
}
bootstrap();
