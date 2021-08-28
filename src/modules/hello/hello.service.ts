import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  say({ msg }): string {
    return `hello ${msg}`;
  }

  add({ id, name }): string {
    return `hello ${id} your name is ${name}`
  }

  delete({ id }): string {
    return `deleted ${id}`
  }

  update({ id, name }): string {
    return `updated ${id}'s name be ${name}`
  }
}
