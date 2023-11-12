import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { UserService } from 'src/user/user.service';
import { PostEntity } from './post.entity';
import { PostCreateInput } from './inputs/post-create.input';
import { UserEntity } from 'src/user/user.entity';
import { PostUpdateInput } from './inputs/post-update.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(PostEntity)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Mutation((returns) => PostEntity, {
    description: '게시글 등록',
  })
  @UseGuards(JwtAuthGuard)
  async createPost(@Args('data') data: PostCreateInput): Promise<PostEntity> {
    return await this.postService.createPost(data);
  }

  @Mutation((returns) => PostEntity, {
    description: '게시글 수정',
  })
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: PostUpdateInput,
  ): Promise<PostEntity> {
    return await this.postService.updatePost(id, data);
  }

  @Mutation((returns) => PostEntity, {
    description: '게시글 삭제',
  })
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PostEntity> {
    return await this.postService.deletePost(id);
  }

  @Query((returns) => [PostEntity], {
    description: '게시글 전체 조회',
  })
  @UseGuards(JwtAuthGuard)
  async allPosts() {
    return await this.postService.findAllPosts();
  }

  @Query((returns) => PostEntity, {
    description: '게시글 단건 조회',
    nullable: true,
  })
  async post(@Args('id', { type: () => Int }) id: number) {
    return await this.postService.findPostById(id);
  }

  @ResolveField()
  async user(@Parent() post: PostEntity): Promise<UserEntity> {
    return await this.userService.findUserByPostId(post.id);
  }
}
