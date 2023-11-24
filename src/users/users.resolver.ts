import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CreateUserInput, User, UserResult } from './dtos';
import { UsersService } from './users.service';
import { Post } from '../blog/dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Mutation(() => User, { description: 'Create a new user' })
  async createUser(@Args('input') input: CreateUserInput) {
    return this.service.createUser(input);
  }

  @Query(() => UserResult, { description: 'Find a user by id' })
  async findUser(@Args('id') id: string) {
    return this.service.find(id);
  }

  @ResolveField(() => [Post])
  async posts(@Parent() user: User) {
    return this.service.posts(user.id);
  }
}
