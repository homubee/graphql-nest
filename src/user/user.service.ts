import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateInput } from './inputs/user-create.input';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: UserCreateInput) {
    return await this.prismaService.user.create({
      data,
    });
  }

  async findAllUsers() {
    return this.prismaService.user.findMany();
  }

  async findUserById(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findUserByPostId(id: number) {
    return await this.prismaService.post
      .findUnique({
        where: {
          id,
        },
      })
      .user();
  }
}
