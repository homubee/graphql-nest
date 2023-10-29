import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostEntity } from './post.entity';
import { PostCreateInput } from './inputs/post-create.input';
import { PostUpdateInput } from './inputs/post-update.input';
import { Status } from 'src/common/enums/status.enum';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(data: PostCreateInput): Promise<PostEntity> {
    return await this.prismaService.post.create({
      data,
    });
  }

  async updatePost(id: number, data: PostUpdateInput): Promise<PostEntity> {
    return await this.prismaService.post.update({
      where: {
        id,
      },
      data,
    });
  }

  async deletePost(id: number): Promise<PostEntity> {
    return await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        status: Status.DELETED,
      },
    });
  }

  async findAllPosts(): Promise<PostEntity[]> {
    return await this.prismaService.post.findMany();
  }

  async findPostById(id: number): Promise<PostEntity> {
    return await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
  }

  async findPostsByUserId(id: number): Promise<PostEntity[]> {
    return await this.prismaService.user
      .findUnique({
        where: {
          id,
        },
      })
      .posts();
  }
}
