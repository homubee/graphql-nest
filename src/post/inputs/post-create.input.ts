import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostCreateInput {
  @Field()
  userId: number;

  @Field()
  title: string;

  @Field()
  content: string;
}
