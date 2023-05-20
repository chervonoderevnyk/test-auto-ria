import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsWalidWords } from '../../users/dekorators/bad.words.dekorators';

export class CreateCarsDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsWalidWords()
  markName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsWalidWords()
  modelName: string;

  @ApiProperty()
  @IsOptional()
  @IsWalidWords()
  image: string;

  @ApiProperty({ default: false })
  @IsNotEmpty()
  published: boolean;
}
