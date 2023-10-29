import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { UserService } from 'src/user/user.service';
import { PostEntity } from './post.entity';
import { PostCreateInput } from './inputs/post-create.input';
import { UserEntity } from 'src/user/user.entity';
import { PostUpdateInput } from './inputs/post-update.input';

@Resolver(PostEntity)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Mutation((returns) => PostEntity)
  async createPost(@Args('data') data: PostCreateInput): Promise<PostEntity> {
    return await this.postService.createPost(data);
  }

  @Mutation((returns) => PostEntity)
  async updatePost(
    @Args('id') id: number,
    @Args('data') data: PostUpdateInput,
  ): Promise<PostEntity> {
    return await this.postService.updatePost(id, data);
  }

  @Mutation((returns) => PostEntity)
  async deletePost(@Args('id') id: number): Promise<PostEntity> {
    return await this.postService.deletePost(id);
  }

  @Query((returns) => [PostEntity])
  async allPosts() {
    return await this.postService.findAllPosts();
  }

  @Query((returns) => PostEntity, { nullable: true })
  async post(@Args('id') id: number) {
    return await this.postService.findPostById(id);
  }

  @ResolveField()
  async user(@Root() post: PostEntity): Promise<UserEntity> {
    return await this.userService.findUserByPostId(post.id);
  }
}
