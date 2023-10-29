import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInInput } from './inputs/signin.input';
import { UserEntity } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async issueTokens(payload: any): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: `${this.configService.get('JWT_EXPIRES_IN')}`,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: `${this.configService.get('JWT_REFRESH_EXPIRES_IN')}`,
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async validateUser(signInDto: SignInInput): Promise<UserEntity | null> {
    const { email, password } = signInDto;

    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async signin(signinInput: SignInInput) {
    return await this.issueTokens({ email: signinInput.email });
  }
}
