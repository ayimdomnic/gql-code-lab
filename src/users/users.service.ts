import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { CreateUserInput, UserNotFoundError } from './dtos';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(input: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        ...input,
      },
    });
  }

  async find(id: string) {
    const user = await this.prisma.user.findUnique({
      include: { posts: true },
      where: {
        id,
      },
    });

    if (!user) {
      return new UserNotFoundError();
    }

    return user;
  }

  async posts(userId: string) {
    const posts = await this.prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    if (!posts) {
      return new UserNotFoundError();
    }

    return posts;
  }
}
