import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '@prisma/client';
import { UserEntity } from 'src/user/user.entity';

@ObjectType()
export class PostEntity implements Post {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  userId: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  content: string;

  @Field((type) => Int)
  status: number;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => UserEntity)
  user?: UserEntity;
}
