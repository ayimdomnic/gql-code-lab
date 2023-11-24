//Models
//DTOs->INPUTS
//DTOs->OUTPUTS

import { Field, ID, InputType, ObjectType, PartialType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => ID, {
    description: 'Unique identifier for the post',
    nullable: true,
  }) // Field decorator is used to define the GraphQL schema
  id: string;

  @Field(() => String, { description: 'Title of the post' })
  title: string;

  @Field(() => String, { description: 'Content of the post' })
  content: string;

  @Field(() => Boolean, {
    description: 'If the post is published or not',
    nullable: true,
  })
  published: boolean;

  @Field(() => String, {
    description: 'Unique identifier for the author',
    nullable: true,
  })
  authorId: string;
}

@InputType()
export class CreatePostInput {
  @Field(() => String, { description: 'Title of the post' })
  title: string;

  @Field(() => String, { description: 'Content of the post' })
  content: string;

  @Field(() => Boolean, {
    description: 'If the post is published or not',
    nullable: true,
  })
  published: boolean;

  @Field(() => String, {
    description: 'Unique identifier for the author',
    nullable: true,
  })
  authorId: string;
}

@InputType()
export class UpdatePost extends PartialType(CreatePostInput) {}
