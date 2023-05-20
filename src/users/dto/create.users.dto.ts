import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../auth/model/roles.enum';
import { IsWalidWords } from '../dekorators/bad.words.dekorators';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsWalidWords()
  lastName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsWalidWords()
  @IsWalidWords()
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
  @IsWalidWords()
  email: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  premium: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsWalidWords()
  roles: Role;
}
