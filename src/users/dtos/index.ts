/* eslint-disable @typescript-eslint/no-unused-vars */
import { LogLevel } from '@nestjs/common';
import {
  Field,
  ID,
  InputType,
  ObjectType,
  createUnionType,
} from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}

export abstract class BaseError extends ApolloError {
  constructor(
    message: string,
    variables: {
      [key: string]: string | number;
    } = {},
    errorCode: string,
    public logLevel: LogLevel = 'warn',
  ) {
    super(message, errorCode);
  }
}

@ObjectType()
export class ErrorResult {
  @Field(() => String)
  message: string;

  @Field(() => String)
  errorCode: string;

  __typename: string;
}

@ObjectType()
export class UserNotFoundError extends ErrorResult {
  readonly message = 'User not found';
  readonly errorCode = 'USER_NOT_FOUND';
  readonly __typename = 'UserNotFoundError';

  constructor() {
    super();
  }
}

const userErrorTypes = new Set(['UserNotFoundError']);

export const isGraphQLError = (error: any): error is ErrorResult => {
  return error instanceof ErrorResult || userErrorTypes.has(error.__typename);
};

export const UserResult = createUnionType({
  name: 'UserResult',
  types: () => [User, UserNotFoundError],
  resolveType: (value) => {
    return isGraphQLError(value) ? value.__typename : User;
  },
});
