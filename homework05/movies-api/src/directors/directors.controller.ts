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
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Director } from './entities/director.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleType } from 'src/roles/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Roles(RoleType.Admin)
@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Post()
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorsService.create(createDirectorDto);
  }

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

  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.directorsService.update(id, updateDirectorDto);
  }

  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directorsService.remove(id);
  }
}
