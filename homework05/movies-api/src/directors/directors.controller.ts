import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
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
import { Director } from './entities/director.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleType } from 'src/roles/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Roles(RoleType.Admin)
@ApiTags('directors')
@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @ApiBody({
    required: true,
    type: CreateDirectorDto,
  })
  @ApiBadRequestResponse({ description: 'director already exists' })
  @ApiOperation({ summary: 'Endpoint that creates a director' })
  @ApiResponse({ status: 201, description: 'director created successfully' })
  @HttpCode(201)
  @Post()
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorsService.create(createDirectorDto);
  }

  @ApiOperation({ summary: 'Endpoint that fetches all directors' })
  @ApiInternalServerErrorResponse({
    description: "The server couldn't fetch the directors",
  })
  @ApiResponse({ status: 200, description: 'directors found successfully' })
  @Roles(RoleType.User)
  @Get()
  findAll() {
    return this.directorsService.findAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiBadRequestResponse({ description: 'Invalid Director ID format' })
  @ApiNotFoundResponse({ description: 'Director not found' })
  @ApiOperation({ summary: 'Endpoint that fetches a Director by ID' })
  @ApiResponse({
    status: 200,
    description: 'Director found successfully',
    type: Director,
  })
  @ApiBadRequestResponse({ description: 'ID not found' })
  @HttpCode(200)
  @Roles(RoleType.User)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorsService.findOne(id);
  }

  @ApiOperation({ summary: 'Endpoint that updates a director' })
  @ApiBadRequestResponse({
    description: 'Invalid director ID format or director data',
  })
  @ApiNotFoundResponse({ description: 'director not found' })
  @ApiResponse({ status: 204, description: 'director updated successfully' })
  @HttpCode(204)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.directorsService.update(id, updateDirectorDto);
  }

  @ApiOperation({ summary: 'Endpoint that deletes a director' })
  @ApiBadRequestResponse({ description: 'Invalid director ID format' })
  @ApiNotFoundResponse({ description: 'director not found' })
  @ApiResponse({ status: 204, description: 'director deleted successfully' })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directorsService.remove(id);
  }
}
