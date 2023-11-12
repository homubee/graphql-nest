import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { BaseEntity } from 'src/common/classes/base.entity';
import { PostEntity } from 'src/post/post.entity';

@ObjectType()
export class UserEntity extends BaseEntity implements User {
  @Field((type) => Int, { description: 'id' })
  id: number;

  @Field({ description: '이메일' })
  email: string;

  @Field({ description: '이름' })
  name: string;

  password: string;

  @Field((type) => [PostEntity], { description: '작성한 게시글 목록' })
  posts?: PostEntity[];
}
