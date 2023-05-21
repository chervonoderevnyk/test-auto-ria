import { Module } from '@nestjs/common';
import { PassportWrapperModule } from './auth/passport-wrapper.module';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './core/orm/prisma.module';
import { AuthController } from './auth/auth.controller';
import { RolesGuard } from './auth/model/roles.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CoreModule } from './core/core.module';
import { MailService } from './core/mail/mail.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { doc } from 'prettier';
import join = doc.builders.join;

@Module({
  imports: [
    UsersModule,
    CarsModule,
    PrismaModule,
    AuthModule,
    PassportWrapperModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
    ThrottlerModule.forRoot({
      ttl: 7,
      limit: 3,
    }),
    CoreModule,
    MailService,
  ],
  controllers: [AppController, UsersController, CarsController, AuthController],
  providers: [
    AppService,
    CarsService,
    UsersService,
    PrismaModule,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
