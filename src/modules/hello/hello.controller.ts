import { RolesGuard } from './../guards/roles.guards';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
// import { ApiBody, ApiHeader, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HelloService } from './hello.service'
import { Roles } from '../decorators/roles.decorator'

@Controller('hello')
// @ApiTags('hello Api')
@UseGuards(RolesGuard)
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  // 官方文档的写法：@Query('msg') msg....
  // 这种写法是没有解构的，此外在query里也多写了个变量名，但实测
  // 不写也没关系，此外多个变量这里面就没办法写变量名了，所以干脆统一不写
  // 在下面测试发现这玩意写了的意思不是“参数里必须要有个这个名称的变量”
  // 而是解构...也就是ES6解构和这个写法只能选一个，个人觉得ES6写法更好
  @Get()
  // @ApiQuery({ name: 'msg', required: true })
  sayHello(@Query() { msg }): string {
    return this.helloService.say({ msg });
  }

  // 这里Body一定要接受x-www-form-urlencode，不然无法获得参数
  // 暂且没找到swagger怎么设置POST参数，这里这样写只能手动构造一个json数据传过去...
  @Post()
  // @ApiBody({ description: 'I am a post request' })
  // @ApiParam({ name: 'id', required: true })
  // @ApiParam({ name: 'name', required: true })
  addHello(@Body() { id, name }) {
    return this.helloService.add({ id, name });
  }

  // 这里为什么delete是用的类似GET的形式暂且蒙古
  // 官方写法如下，教程应该是有问题w，此外这里parma应该是url路径参数
  // 而不是query的字符串参数
  // 另外要注意，这个动态路由的:id就对应着参数的键
  @Delete(':id')
  // @ApiParam({ name: 'id', required: true })
  deleteHello(@Param() { id }) {
    // parma，也可以直接接受整个对象
    return this.helloService.delete({ id });
  }

  // 注意更新比较特殊，它是根据url获取id，根据body获取更新数据
  @Patch(':id')
  // @ApiParam({ name: 'id', required: true })
  // @ApiBody({ description: 'name body' })
  patchHello(@Param() { id }, @Body() { name }) {
    return this.helloService.update({ id, name });
  }

  @Get('/pipe')
  // @ApiQuery({ name: 'id', required: true })
  pipeTest(@Query('id', new ParseIntPipe()) id: number) {
    console.log(id);
    console.log(typeof id);
  }

  @Post('/roles')
  @Roles('admin')
  // @ApiBody({ required: true })
  roleGuard(@Body() { roles }) {
    console.log(roles);
    return 'success';
  }
}
