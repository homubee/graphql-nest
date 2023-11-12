import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class SignInInput {
  @Field({ description: '이메일' })
  @IsEmail()
  email: string;

  @Field({ description: '비밀번호' })
  password: string;
}
