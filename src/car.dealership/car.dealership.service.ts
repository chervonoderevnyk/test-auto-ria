import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '../core/orm/prisma.service';
import { RegisterCarDealershipDto } from '../auth/dto/auth.dto';
import { Role } from '../auth/model/roles.enum';
import { CreateCarDealershipDto } from './dto/create.car.dealership.dto';

@Injectable()
export class CarDealershipService {
  private salt = 10;

  constructor(private readonly prismaService: PrismaService) {}
  // async createCarDealershipByManager(salonData: CreateCarDealershipDto) {
  //   return this.prismaService.carDealership.create({
  //     data: {
  //       salonName: salonData.salonName,
  //       phoneNumber: salonData.phoneNumber,
  //       email: salonData.email,
  //       premium: salonData.premium,
  //       roles: Role.User,
  //     },
  //   });
  // }
  //
  // async createCarDealership(salonData: RegisterCarDealershipDto) {
  //   const passwordHash = await this.hashPassword(salonData.password);
  //   return this.prismaService.carDealership.create({
  //     data: {
  //       salonName: salonData.salonName,
  //       email: salonData.email,
  //       password: passwordHash,
  //       roles: salonData.roles,
  //     },
  //   });
  // }
  // async hashPassword(password: string) {
  //   return bcrypt.hash(password, this.salt);
  // }
  //
  // async getCarDealershipList() {
  //   return this.prismaService.carDealership.findMany({
  //     select: {
  //       id: true,
  //       salonName: true,
  //       phoneNumber: true,
  //       email: true,
  //       premium: true,
  //       car: true,
  //       roles: true,
  //     },
  //   });
  // }
  //
  // async getCarDealershipById(carDealershipId: string) {
  //   return this.prismaService.carDealership.findFirst({
  //     where: { id: Number(carDealershipId) },
  //     select: {
  //       id: true,
  //       salonName: true,
  //       phoneNumber: true,
  //       email: true,
  //       premium: true,
  //       car: true,
  //       password: true,
  //       roles: true,
  //     },
  //   });
  // }
  //
  // async updateCarDealership(carDealershipId: string, UpdateCarDealershipDto) {
  //   return this.prismaService.carDealership.update({
  //     where: { id: Number(carDealershipId) },
  //     data: UpdateCarDealershipDto,
  //   });
  // }
  //
  // async deleteCarDealership(carDealershipId: string) {
  //   return this.prismaService.carDealership.delete({
  //     where: { id: Number(carDealershipId) },
  //   });
  // }
  //
  // async findCarDealershipByEmail(CarDealershipEmail: string) {
  //   return this.prismaService.carDealership.findFirst({
  //     where: { email: CarDealershipEmail },
  //   });
  // }

  // const postCount = await this.prismaService.cars.count({
  //   where: {
  //     carDealershipId: 29,
  //   },
  // })
}
