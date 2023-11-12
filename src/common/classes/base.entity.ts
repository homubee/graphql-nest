import { Field, ObjectType } from '@nestjs/graphql';
import { Status } from '../enums/status.enum';

@ObjectType()
export class BaseEntity {
  @Field((type) => Status, { description: '상태' })
  status: Status;

  @Field({ description: '생성일' })
  createdAt: Date;

  @Field({ description: '수정일' })
  updatedAt: Date;
}
