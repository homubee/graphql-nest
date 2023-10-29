import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  DELETED = 0,
  NORMAL = 1,
}
registerEnumType(Status, { name: 'Status' });
