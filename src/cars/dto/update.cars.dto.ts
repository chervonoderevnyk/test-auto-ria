import { PartialType } from '@nestjs/swagger';

import { CreateCarsDto } from './create.cars.dto';

export class UpdateCarDto extends PartialType(CreateCarsDto) {}
