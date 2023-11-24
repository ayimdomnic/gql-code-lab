import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { PrismaModule } from '../prisma';

@Module({
  imports: [PrismaModule],
  exports: [BlogService],
  providers: [BlogService, BlogResolver],
})
export class BlogModule {}
