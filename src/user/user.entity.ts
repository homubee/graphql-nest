import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { Status } from 'src/common/enums/status.enum';
import { PostEntity } from 'src/post/post.entity';

@ObjectType()
export class UserEntity implements User {
  @Field((type) => Int)
  id: number;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  name: string;

  password: string;

  @Field((type) => Status)
  status: number;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => [PostEntity])
  posts?: PostEntity[];
}
