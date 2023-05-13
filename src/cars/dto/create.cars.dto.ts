import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCarsDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  markName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  modelName: string;

  @ApiProperty()
  @IsOptional()
  image: string;

  @ApiProperty({ default: false })
  @IsNotEmpty()
  published: boolean;
}
