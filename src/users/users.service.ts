import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create.users.dto';
import { PrismaService } from '../core/orm/prisma.service';
import { RegisterDto, RegisterManagerDto } from '../auth/dto/auth.dto';
import { Role } from '../auth/model/roles.enum';

@Injectable()
export class UsersService {
  private salt = 10;

  constructor(private readonly prismaService: PrismaService) {}
  async createUserByManager(userData: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        lastName: userData.lastName,
        firstName: userData.firstName,
        email: userData.email,
        premium: userData.premium,
        roles: Role.User,
      },
    });
  }

  async createUser(userData: RegisterDto): Promise<User> {
    const passwordHash = await this.hashPassword(userData.password);
    return this.prismaService.user.create({
      data: {
        lastName: userData.lastName,
        email: userData.email,
        password: passwordHash,
        roles: userData.roles,
      },
    });
  }
  async hashPassword(password: string) {
    return bcrypt.hash(password, this.salt);
  }

  async createManager(userData: RegisterManagerDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        lastName: userData.lastName,
        firstName: userData.firstName,
        email: userData.email,
        premium: userData.premium,
        roles: Role.Manager,
      },
    });
  }

  async getUserList() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        lastName: true,
        firstName: true,
        email: true,
        premium: true,
        car: true,
        roles: true,
      },
    });
  }

  async getUserById(userId: string) {
    return this.prismaService.user.findFirst({
      where: { id: Number(userId) },
      select: {
        id: true,
        lastName: true,
        firstName: true,
        email: true,
        premium: true,
        car: true,
        password: true,
        roles: true,
      },
    });
  }

  async updateUser(userId: string, UpdateUserDto): Promise<User> {
    return this.prismaService.user.update({
      where: { id: Number(userId) },
      data: UpdateUserDto,
    });
  }

  async deleteUser(userId: string) {
    return this.prismaService.user.delete({ where: { id: Number(userId) } });
  }

  async findUserByEmail(userEmail: string) {
    return this.prismaService.user.findFirst({
      where: { email: userEmail },
    });
  }
}
