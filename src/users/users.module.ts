import { forwardRef, Module } from '@nestjs/common';

import { PrismaService } from '../core/orm/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CarsModule } from '../cars/cars.module';
import { CarsService } from '../cars/cars.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/model/roles.guard';

@Module({
  imports: [forwardRef(() => CarsModule)],
  providers: [
    PrismaService,
    UsersService,
    CarsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
