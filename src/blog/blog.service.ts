import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput } from './dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreatePostInput) {
    return this.prisma.post.create({
      data: {
        ...input,
      },
    });
  }
}
