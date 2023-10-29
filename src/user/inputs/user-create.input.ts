import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';

@InputType()
export class UserCreateInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  name: string;

  @Field()
  @Transform(({ value }) => bcrypt.hashSync(value, 10))
  password: string;
}
