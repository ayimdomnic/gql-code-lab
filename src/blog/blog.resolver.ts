import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePostInput, Post } from './dto';
import { BlogService } from './blog.service';

@Resolver(() => Post)
export class BlogResolver {
  constructor(private readonly service: BlogService) {}

  @Mutation(() => Post, { description: 'Create a new post' })
  async createPost(@Args('input') input: CreatePostInput) {
    return this.service.create(input);
  }
}
