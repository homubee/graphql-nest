import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { PostService } from 'src/post/post.service';
import { UserCreateInput } from './inputs/user-create.input';
import { PostEntity } from 'src/post/post.entity';

@Resolver(UserEntity)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Mutation((returns) => UserEntity, {
    description: '회원가입',
  })
  async signupUser(@Args('data') data: UserCreateInput): Promise<UserEntity> {
    return await this.userService.createUser(data);
  }

  @Query((returns) => [UserEntity], {
    description: '유저 전체 조회',
  })
  async allUsers() {
    return this.userService.findAllUsers();
  }

  @Query((returns) => UserEntity, {
    description: '유저 단건 조회',
    nullable: true,
  })
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findUserById(id);
  }

  @ResolveField()
  async posts(@Root() user: UserEntity): Promise<PostEntity[]> {
    return await this.postService.findPostsByUserId(user.id);
  }
}
