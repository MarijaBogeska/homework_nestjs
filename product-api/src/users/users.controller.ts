import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private serviceUser: UsersService) {}

  @Get()
  findAll() {
    return this.serviceUser.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.serviceUser.findById(id);
  }

  @Get(':id/details')
  findUserDetails(@Param('id') id: string) {
    return this.serviceUser.findUserDetails(id);
  }

  @Post()
  create(@Body() createData: CreateUserDto) {
    return this.serviceUser.create(createData);
  }

  @HttpCode(204)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateUserDto) {
    return this.serviceUser.update(id, updateData);
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceUser.delete(id);
  }
}
