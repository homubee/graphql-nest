import {
  Args,
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

  @Mutation((returns) => UserEntity)
  async signupUser(@Args('data') data: UserCreateInput): Promise<UserEntity> {
    return await this.userService.createUser(data);
  }

  @Query((returns) => [UserEntity])
  async allUsers() {
    return this.userService.findAllUsers();
  }

  @Query((returns) => UserEntity, { nullable: true })
  async user(@Args('id') id: number) {
    return this.userService.findUserById(id);
  }

  @ResolveField()
  async posts(@Root() user: UserEntity): Promise<PostEntity[]> {
    return await this.postService.findPostsByUserId(user.id);
  }
}
