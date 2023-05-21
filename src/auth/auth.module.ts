import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { BearerStrategy } from './bearer.strategy';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../core/orm/prisma.service';
import { MailService } from '../core/mail/mail.service';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [
    UsersModule,
    CoreModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'Secret',
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    BearerStrategy,
    UsersService,
    PrismaService,
    MailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
