import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
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
import { Actor } from './entities/actor.entity';

@ApiTags('actors')
@UseGuards(AuthGuard, RolesGuard)
@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @ApiBody({
      required: true,
      type: CreateActorDto,
    })
    @ApiBadRequestResponse({ description: 'Actor already exists' })
    @ApiOperation({ summary: 'Endpoint that creates a Actor' })
    @ApiResponse({ status: 201, description: 'Actor created successfully' })
    @HttpCode(201)
  @Roles(RoleType.Admin)
  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorsService.create(createActorDto);
  }

  @ApiOperation({ summary: 'Endpoint that fetches all actors' })
    @ApiInternalServerErrorResponse({
      description: "The server couldn't fetch the actors",
    })
    @ApiResponse({ status: 200, description: 'actors found successfully' })
    @HttpCode(200)
  @Get()
  findAll() {
    return this.actorsService.findAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiBadRequestResponse({ description: 'Invalid Actor ID format' })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  @ApiOperation({ summary: 'Endpoint that fetches a Actor by ID' })
  @ApiResponse({
    status: 200,
    description: 'Actor found successfully',
    type: Actor,
  })
  @ApiBadRequestResponse({ description: 'ID not found' })
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorsService.findOne(id);
  }

  @ApiOperation({ summary: 'Endpoint that updates a Actor' })
  @ApiBadRequestResponse({
    description: 'Invalid Actor ID format or Actor data',
  })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  @ApiResponse({ status: 204, description: 'Actor updated successfully' })
  @HttpCode(204)
  @Roles(RoleType.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorsService.update(id, updateActorDto);
  }

  @ApiOperation({ summary: 'Endpoint that deletes a Actor' })
  @ApiBadRequestResponse({ description: 'Invalid Actor ID format' })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  @ApiResponse({ status: 204, description: 'Actor deleted successfully' })
  @HttpCode(204)
  @Roles(RoleType.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorsService.remove(id);
  }
}
