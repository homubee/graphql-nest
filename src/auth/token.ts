import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field((type) => String)
  access_token: string;
}
