import { forwardRef, Module } from '@nestjs/common';

import { CarsService } from './cars.service';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersService } from '../users/users.service';
import { CarsController } from './cars.controller';

@Module({
  imports: [forwardRef(() => UsersModule), PrismaService],
  providers: [CarsService, UsersService, PrismaService],
  controllers: [CarsController],
  exports: [CarsService],
})
export class CarsModule {}
