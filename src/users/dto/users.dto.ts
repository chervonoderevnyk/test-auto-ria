import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Role } from '../model/roles.enum';
import { Query } from '@nestjs/common';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  // @IsNotEmpty()
  @IsOptional()
  password: string;

  @ApiProperty({ required: true, example: '@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  premium: boolean;

  @ApiProperty({ enum: ['Admin', 'Moderator', 'User'] })
  @IsString()
  roles: Role;
}
