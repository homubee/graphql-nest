import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PostCreateInput {
  @Field((type) => Int, { description: '유저 id' })
  userId: number;

  @Field({ description: '제목' })
  title: string;

  @Field({ description: '내용' })
  content: string;
}
