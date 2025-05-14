import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dtos/create-room.dto';
import UpdateRoomDto from './dtos/update-room.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Room, RoomTypes } from './entities/room.entity';
import { FiltersRoomDto } from './dtos/filters-rooms.dto';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  
  constructor(private serviceRoom: RoomsService) {}

  // GET ALL ROOMS
  @ApiOperation({ summary: 'endpoint that fetches all rooms' })
  @ApiInternalServerErrorResponse({
    description: "the server couldn't fetch the rooms",
  })
  @ApiResponse({ status: 200, description: 'Rooms found successfully' })
  @ApiQuery({ name: 'roomNumber', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, type: 'string' })
  @ApiQuery({ name: 'minPrice', required: false, type: 'number' })
  @ApiQuery({ name: 'maxPrice', required: false, type: 'number' })
  @ApiQuery({ name: 'isAvailable', required: false, type: 'boolean' })
  @HttpCode(201)
  @Get()
  getAll(@Query() filters: FiltersRoomDto) {
    return this.serviceRoom.getAll(filters);
  }

  //   GET ROOM BY ID
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiBadRequestResponse({ description: 'Invalid room ID format' })
  @ApiNotFoundResponse({ description: 'Room not found' })
  @ApiOperation({ summary: 'endpoint that fetches a room by room number' })
  @ApiResponse({
    status: 200,
    description: 'Room found successfully',
    type: Room,
  })
  @ApiBadRequestResponse({ description: 'id not found' })
  @HttpCode(200)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.serviceRoom.getById(id);
  }

  //   CREATE ROOM
  @ApiBody({
    required: true,
    type: CreateRoomDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid room data' })
  @ApiConflictResponse({ description: 'Room already exists' })
  @ApiOperation({ summary: 'endpoint that creates a room' })
  @ApiResponse({ status: 201, description: 'Room created successfully' })
  @HttpCode(201)
  @Post()
  create(@Body() body: CreateRoomDto) {
    return this.serviceRoom.create(body);
  }

  //   UPDATE ROOM
  @ApiOperation({ summary: 'endpoint that updates a room' })
  @ApiBadRequestResponse({ description: 'Invalid room ID format or room data' })
  @ApiNotFoundResponse({ description: 'Room not found' })
  @ApiResponse({ status: 204, description: 'Room updated successfully' })
  @HttpCode(204)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateRoomDto) {
    return this.serviceRoom.update(id, body);
  }

  //   DELETE ROOM
  @ApiOperation({ summary: 'endpoint that updates a room' })
  @ApiBadRequestResponse({ description: 'Invalid room ID format' })
  @ApiNotFoundResponse({ description: 'Room not found' })
  @ApiResponse({ status: 204, description: 'Room deleted successfully' })
  @HttpCode(204)
  @Delete(':id')
  deleteRoom(@Param('id') id: string) {
    return this.serviceRoom.delete(id);
  }
}
