import { forwardRef, Module } from '@nestjs/common';

import { PrismaService } from '../core/orm/prisma.service';
import { CarsService } from '../cars/cars.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/model/roles.guard';
import { CarDealershipService } from './car.dealership.service';
import { CarDealershipController } from './car.dealership.controller';

@Module({
  imports: [forwardRef(() => CarDealershipModule)],
  providers: [
    PrismaService,
    CarDealershipService,
    CarsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [CarDealershipController],
})
export class CarDealershipModule {}
