import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly userList = [
    { name: 'hwz', age: 18, gender: 'male' },
    { name: 'yjsp', age: 18, gender: 'male' },
  ];
  getList() {
    return this.userList;
  }

  find(username: string) {
    return this.userList.find(user => user.name === username);
  }
}
