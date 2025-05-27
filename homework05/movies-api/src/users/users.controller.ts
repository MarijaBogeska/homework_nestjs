import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleType } from 'src/roles/role.enum';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Roles(RoleType.Admin)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({
    required: true,
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'User already exists' })
  @ApiOperation({ summary: 'Endpoint that creates a User' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @HttpCode(201)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Endpoint that fetches all Users' })
  @ApiInternalServerErrorResponse({
    description: "The server couldn't fetch the Users",
  })
  @ApiResponse({ status: 200, description: 'Users found successfully' })
  @HttpCode(200)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiBadRequestResponse({ description: 'Invalid User ID format' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOperation({ summary: 'Endpoint that fetches a User by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found successfully',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'ID not found' })
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Endpoint that updates a User' })
  @ApiBadRequestResponse({
    description: 'Invalid User ID format or User data',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiResponse({ status: 204, description: 'User updated successfully' })
  @HttpCode(204)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Endpoint that deletes a User' })
  @ApiBadRequestResponse({ description: 'Invalid User ID format' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
