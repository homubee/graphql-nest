import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '@prisma/client';
import { BaseEntity } from 'src/common/classes/base.entity';
import { UserEntity } from 'src/user/user.entity';

@ObjectType()
export class PostEntity extends BaseEntity implements Post {
  @Field((type) => Int, { description: 'id' })
  id: number;

  @Field((type) => Int, { description: '유저 id' })
  userId: number;

  @Field({ description: '제목' })
  title: string;

  @Field({ description: '내용' })
  content: string;

  @Field((type) => UserEntity, { description: '작성자' })
  user?: UserEntity;
}
