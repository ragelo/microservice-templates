import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { User } from '../graphql/user.dto';
import { UserService } from '../user.service';

interface UserById {
  id: string;
}

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService')
  findOne(data: UserById): Promise<User> {
    return this.userService.findById(data.id);
  }
}
