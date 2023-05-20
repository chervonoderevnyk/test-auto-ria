import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';

import { Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requireRoles) {
      return true;
    }
    // const { user } = context.switchToHttp().getRequest();
    // const user = {
    //   id: Number('1'),
    //   firstName: 'Bosyj',
    //   lastName: 'Admin',
    //   email: 'BossB@gmail.com',
    //   password: '11111',
    //   premium: true,
    //   roles: 'Admin',
    // };

    const user: User = context.switchToHttp().getRequest();
    return requireRoles.some((role: Role) => user.roles?.includes(role));
  }
}
