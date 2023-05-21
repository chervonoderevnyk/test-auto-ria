import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  PayloadTooLargeException,
} from '@nestjs/common';

import { PrismaService } from '../core/orm/prisma.service';
import { CreateCarsDto } from './dto/create.cars.dto';
import { UsersService } from '../users/users.service';
import { Cars } from '@prisma/client';
import { UpdateCarDto } from './dto/update.cars.dto';

@Injectable()
export class CarsService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async getCarList(): Promise<Cars[]> {
    return this.prismaService.cars.findMany();
  }

  async getCarPublished(): Promise<Cars[]> {
    return this.prismaService.cars.findMany({ where: { published: true } });
  }

  async getCarById(carId: string) {
    return this.prismaService.cars.findMany({
      where: { ownerId: Number(carId) },
      select: {
        markName: true,
        modelName: true,
        image: true,
        published: true,
        ownerId: true,
      },
    });
  }

  async getCarsFilter(params: {
    where: {
      OR: (
        | { markName?: { contains: string } }
        | { modelName?: { contains: string } }
      )[];
    };
  }): Promise<Cars[]> {
    const { where } = params;
    return this.prismaService.cars.findMany({
      where,
    });
  }

  async addNewCar(carData: CreateCarsDto, userId: string): Promise<Cars> {
    const user = await this.checkUser(userId);
    if (!user) {
      throw new NotFoundException(`User with ${userId} does not exist.`);
    }

    const userPacket = await this.checkUserPremium(userId);
    if (!userPacket) {
      throw new HttpException(
        'You added a car, buy a premium package',
        HttpStatus.OK,
      );
    }

    const userCar = await this.getCarById(userId);
    if (!userCar) {
      throw new PayloadTooLargeException(`Car already exist.`);
    }

    const userCarId = await this.checkUserCar();
    if (!userCarId) {
      throw new PayloadTooLargeException(`Car already exist.`);
    }

    return this.prismaService.cars.create({
      data: {
        markName: carData.markName,
        modelName: carData.modelName,
        image: carData.image,
        published: carData.published,
        ownerId: user.id,
      },
    });
  }

  async createCar(carData: CreateCarsDto, userId: string): Promise<Cars> {
    const user = await this.checkUser(userId);
    if (!user) {
      throw new NotFoundException(`User with ${userId} does not exist.`);
    }

    return this.prismaService.cars.create({
      data: {
        markName: carData.markName,
        modelName: carData.modelName,
        image: carData.image,
        published: carData.published,
        ownerId: user.id,
      },
    });
  }

  async updateCar(userId: string, updateCarDto: UpdateCarDto): Promise<Cars> {
    return this.prismaService.cars.update({
      where: { id: Number(userId) },
      data: updateCarDto,
    });
  }

  async updateCarPub(params: {
    where: { id?: number };
    data: UpdateCarDto;
  }): Promise<Cars> {
    const { data, where } = params;
    return this.prismaService.cars.update({
      data,
      where,
    });
  }

  // async deleteCar(carId: string) {
  //   // const user = await this.checkUser(userId);
  //   // if (!user) {
  //   //   throw new NotFoundException(`User with ${userId} does not exist.`);
  //   // }
  //   return this.prismaService.cars.delete({ where: { id: Number(carId) } });
  // }

  async checkUser(userId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ${userId} does not exist.`);
    }
    return user;
  }

  async checkUserPremium(userId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ${userId} does not exist.`);
    }
    return (user.premium = true);
  }

  async checkUserCar() {
    const userCars = await this.prismaService.user.findFirst({
      include: {
        car: {
          include: {
            owner: true,
          },
        },
      },
    });
    return userCars.id;
  }
}
