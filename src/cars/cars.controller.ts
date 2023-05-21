import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { CarsService } from './cars.service';
import { CreateCarsDto } from './dto/create.cars.dto';
import { UsersService } from '../users/users.service';
import { UpdateCarDto } from './dto/update.cars.dto';
import { Cars } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/model/roles.decorator';
import { Role } from '../auth/model/roles.enum';
import { RolesGuard } from '../auth/model/roles.guard';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  @Get()
  @Throttle(10, 3)
  async getCarList(@Req() req: any, @Res() res: any) {
    return res.status(HttpStatus.OK).json(await this.carsService.getCarList());
  }

  @Get('published')
  async getCarListPublished(@Req() req: any, @Res() res: any) {
    return res
      .status(HttpStatus.OK)
      .json(await this.carsService.getCarPublished());
  }

  @Get('filtered-getCarsFilter/:searchString')
  async getFilteredCars(
    @Param('searchString') searchString: string,
  ): Promise<Cars[]> {
    return this.carsService.getCarsFilter({
      where: {
        OR: [
          {
            markName: { contains: searchString },
          },
          {
            modelName: { contains: searchString },
          },
        ],
      },
    });
  }

  @ApiParam({ name: 'carId', required: true })
  @Get('/:carId')
  @Roles(Role.Admin, Role.Manager)
  @UseGuards(AuthGuard(), RolesGuard)
  async getUserInfo(
    @Req() req: any,
    @Res() res: any,
    @Param('carId') carId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.carsService.getCarById(carId));
  }

  @Post('/:userId')
  @UseGuards(AuthGuard())
  async createCar(
    @Req() req: any,
    @Res() res: any,
    @Body() carData: CreateCarsDto,
    @Param('userId') userId: string,
  ) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: `User with id: ${userId} not fount` });
    }

    return this.carsService.createCar(
      {
        markName: carData.markName,
        modelName: carData.modelName,
        image: carData.image,
        published: carData.published,
      },
      userId,
    );
    // return res
    //   .status(HttpStatus.OK)
    //   .json(await this.carsService.createCar(createCarsDto));
  }

  @Post('/:userId')
  @UseGuards(AuthGuard())
  async addNewCar(
    @Req() req: any,
    @Res() res: any,
    @Body() carData: CreateCarsDto,
    @Param('userId') userId: string,
  ) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: `User with id: ${userId} not fount` });
    }

    return this.carsService.addNewCar(
      {
        markName: carData.markName,
        modelName: carData.modelName,
        image: carData.image,
        published: carData.published,
      },
      userId,
    );
    // return res
    //   .status(HttpStatus.OK)
    //   .json(await this.carsService.createCar(createCarsDto));
  }

  @Put('published/:carId')
  @ApiParam({ name: 'carId', required: true })
  @UseGuards(AuthGuard())
  async publishedPost(
    @Param('carId') carId: string,
    @Req() req: any,
    @Res() res: any,
  ): Promise<Cars> {
    return res.status(HttpStatus.OK).json(
      await this.carsService.updateCarPub({
        where: { id: Number(carId) },
        data: { published: true },
      }),
    );
  }

  @Patch('/:userId')
  @ApiParam({ name: 'userId', required: true })
  @UseGuards(AuthGuard())
  async updateCar(
    @Param('carId') carId: string,
    @Req() req: any,
    @Res() res: any,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.carsService.updateCar(carId, updateCarDto));
  }

  // @Delete('/:carId')
  // @UseGuards(AuthGuard())
  // async deleteCar(
  //   @Req() req: any,
  //   @Res() res: any,
  //   @Param('carId') carId: string,
  // ): Promise<Cars> {
  //   return res
  //     .status(HttpStatus.OK)
  //     .json(await this.carsService.deleteCar(carId));
  // }
}
