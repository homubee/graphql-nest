import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';

@InputType()
export class UserCreateInput {
  @Field({ description: '이메일' })
  @IsEmail()
  email: string;

  @Field({ description: '이름' })
  name: string;

  @Field({ description: '비밀번호' })
  @Transform(({ value }) => bcrypt.hashSync(value, 10))
  password: string;
}
