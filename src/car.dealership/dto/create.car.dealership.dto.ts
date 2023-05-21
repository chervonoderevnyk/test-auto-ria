import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../auth/model/roles.enum';
import { IsWalidWords } from '../../users/dekorators/bad.words.dekorators';

export class CreateCarDealershipDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsWalidWords()
  salonName: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsPhoneNumber()
  @IsWalidWords()
  phoneNumber: number;

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

  @ApiProperty({ enum: ['CarDealership'] })
  @IsString()
  @IsOptional()
  @IsWalidWords()
  roles: Role;
}
