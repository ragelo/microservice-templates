import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserInput } from './createUser.input';
import { UserService } from '../user.service';
import { User } from './user.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';

interface ContryService {
  findOne(data: { id: string }): Observable<any>;
}

@Resolver('User')
export class UsersResolver {
  private contryService: ContryService;

  constructor(
    private readonly userService: UserService,
    @Inject('CONTRY_GRPC') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.contryService = this.client.getService<ContryService>('ContryService');
  }

  @Query('users')
  async getUsers() {
    return this.userService.findAll();
  }

  @Mutation('createUser')
  async createUser(@Args('createUserInput') args: CreateUserInput) {
    const contry = await lastValueFrom(
      this.contryService.findOne({ id: args.contry }),
    ).catch((e) => {
      console.error(e);
      return null;
    });

    if (!contry) {
      throw new Error('Unknown contry');
    }

    const user = this.userService.addUser(args);
    return user;
  }

  @ResolveField('contry')
  getContry(@Parent() parent: User) {
    return { __typename: 'Contry', id: parent.contry };
  }
}
