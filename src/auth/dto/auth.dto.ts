import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Role } from '../model/roles.enum';
import { IsWalidWords } from '../../users/dekorators/bad.words.dekorators';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(5, 25)
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(5, 25)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsWalidWords()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  roles: Role;
}
// { type: 'Role', enum: ['Admin', 'Manager', 'User'] }

export class RegisterManagerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsWalidWords()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(5, 25)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsWalidWords()
  lastName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsWalidWords()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsWalidWords()
  roles: Role;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  premium: boolean;
}

export class RegisterCarDealershipDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(5, 25)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsWalidWords()
  salonName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  roles: Role;
}
