import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  isEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { IsWalidWords } from '../../users/dekorators/bad.words.dekorators';
import { markName } from './cars.enums/mark.name.enum';
import { BMW } from './cars.enums/BMW';
import { toyota } from './cars.enums/toyota';

export class CreateCarsDto {
  @ApiProperty({ required: true })
  @ApiProperty({ enum: markName })
  @IsString()
  @IsNotEmpty()
  @IsWalidWords()
  markName: markName;

  @ApiProperty({ required: true })
  @ApiProperty({ enum: { BMW, toyota } })
  @IsString()
  @IsNotEmpty()
  @IsWalidWords()
  modelName: BMW | toyota;

  @ApiProperty()
  @IsOptional()
  @IsWalidWords()
  image: string;

  @ApiProperty({ default: false })
  @IsNotEmpty()
  published: boolean;
}
