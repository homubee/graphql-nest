import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Token } from './token';
import { SignInInput } from './inputs/signin.input';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => Token, {
    description: '로그인',
  })
  @UseGuards(LocalAuthGuard)
  async signin(@Args('data') data: SignInInput, @Context() ctx): Promise<any> {
    const { access_token, refresh_token } = await this.authService.signin(data);
    const response = ctx.res;
    response.cookie('refresh_token', refresh_token);
    return { access_token };
  }
}
