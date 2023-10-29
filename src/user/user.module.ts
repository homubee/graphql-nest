import { Module, forwardRef } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [forwardRef(() => PostModule)],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
