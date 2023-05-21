import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/model/roles.decorator';
import { Role } from '../auth/model/roles.enum';
import { RolesGuard } from '../auth/model/roles.guard';
import { CreateCarDealershipDto } from './dto/create.car.dealership.dto';
import { CarDealershipService } from './car.dealership.service';
import { UpdateCarDealershipDto } from './dto/update.car.dealership.dto';

@ApiTags('CarDealerships')
@Controller('CarDealerships')
export class CarDealershipController {
  constructor(private readonly carDealershipService: CarDealershipService) {}

  // @Post()
  // @Roles(Role.CarDealership)
  // @UseGuards(RolesGuard)
  // async createCarDealershipByManager(
  //   @Req() req: any,
  //   @Body() createCarDealershipDto: CreateCarDealershipDto,
  //   @Res() res: any,
  // ) {
  //   return res
  //     .status(HttpStatus.CREATED)
  //     .json(
  //       await this.carDealershipService.createCarDealershipByManager(
  //         createCarDealershipDto,
  //       ),
  //     );
  // }
  //
  // @Get()
  // @UseGuards(AuthGuard())
  // async getCarDealershipList(@Req() req: any, @Res() res: any) {
  //   return res
  //     .status(HttpStatus.OK)
  //     .json(await this.carDealershipService.getCarDealershipList());
  // }
  //
  // @ApiParam({ name: 'carDealershipId', required: true })
  // @Get('/:carDealershipId')
  // @Roles(Role.CarDealership)
  // @UseGuards(AuthGuard(), RolesGuard)
  // async getCarDealershipInfo(
  //   @Req() req: any,
  //   @Res() res: any,
  //   @Param('carDealershipId') carDealershipId: string,
  // ) {
  //   return res
  //     .status(HttpStatus.OK)
  //     .json(
  //       await this.carDealershipService.getCarDealershipById(carDealershipId),
  //     );
  // }
  //
  // @Patch('/:carDealershipId')
  // @UseGuards(AuthGuard())
  // @ApiParam({ name: 'carDealershipId', required: true })
  // async updateCarDealership(
  //   @Req() req: any,
  //   @Res() res: any,
  //   @Param('carDealershipId') carDealershipId: string,
  //   @Body() updateCarDealershipDto: UpdateCarDealershipDto,
  // ) {
  //   return this.carDealershipService.updateCarDealership(
  //     carDealershipId,
  //     updateCarDealershipDto,
  //   );
  // }
  //
  // @Delete('/:carDealershipId')
  // @UseGuards(AuthGuard())
  // async deleteCarDealership(
  //   @Req() req: any,
  //   @Res() res: any,
  //   @Param('carDealershipId') carDealershipId: string,
  // ) {
  //   return res
  //     .status(HttpStatus.OK)
  //     .json(
  //       await this.carDealershipService.deleteCarDealership(carDealershipId),
  //     );
  // }
}
