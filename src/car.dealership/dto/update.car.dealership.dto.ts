import { PartialType } from '@nestjs/swagger';

import { CreateCarDealershipDto } from './create.car.dealership.dto';
export class UpdateCarDealershipDto extends PartialType(
  CreateCarDealershipDto,
) {}
