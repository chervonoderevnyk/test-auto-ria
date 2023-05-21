import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create.users.dto';
import { UsersService } from './users.service';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update.user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/model/roles.decorator';
import { Role } from '../auth/model/roles.enum';
import { RolesGuard } from '../auth/model/roles.guard';

@ApiTags('Users')
@Controller('users')
// @Roles(Role.User)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @Roles(Role.Admin, Role.Manager)
  @UseGuards(RolesGuard)
  async createUserByManager(
    @Req() req: any,
    @Body() createUserDto: CreateUserDto,
    @Res() res: any,
  ) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUserByManager(createUserDto));
  }

  @Get()
  @UseGuards(AuthGuard())
  async getUserList(@Req() req: any, @Res() res: any) {
    return res.status(HttpStatus.OK).json(await this.userService.getUserList());
  }

  @ApiParam({ name: 'userId', required: true })
  @Get('/:userId')
  @Roles(Role.Admin, Role.Manager)
  @UseGuards(AuthGuard(), RolesGuard)
  async getUserInfo(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.getUserById(userId));
  }

  @Patch('/:userId')
  @UseGuards(AuthGuard())
  @ApiParam({ name: 'userId', required: true })
  async updateUser(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete('/:userId')
  @UseGuards(AuthGuard())
  async deleteUser(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.deleteUser(userId));
  }

  // @ApiQuery({ name: 'roles', enum: Role })
  // async filterByRole(@Query('roles') roles: Role = Role.User) {}
}
