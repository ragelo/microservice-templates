import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './graphql/createUser.input';
import { User } from './graphql/user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: '5d04c130-79b7-48c6-8f99-047a830e5507',
      name: 'Grason',
      contry: 'US',
    },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string) {
    return this.users.find(({ id: userId }) => userId === id);
  }

  async addUser(input: CreateUserInput) {
    const newUser = { ...input, id: randomUUID() };
    this.users.push(newUser);
    return newUser;
  }
}
