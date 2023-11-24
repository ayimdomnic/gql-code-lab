import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Root')
export class AppResolver {
  constructor() {}

  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
}
