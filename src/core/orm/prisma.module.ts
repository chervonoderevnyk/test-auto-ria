import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../../auth/model/roles.guard';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
