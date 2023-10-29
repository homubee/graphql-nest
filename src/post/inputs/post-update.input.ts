import { Field, InputType, OmitType } from '@nestjs/graphql';
import { PostCreateInput } from './post-create.input';

@InputType()
export class PostUpdateInput extends OmitType(PostCreateInput, [
  'userId',
] as const) {}
