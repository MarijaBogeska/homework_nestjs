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
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Room, RoomTypes } from './entities/room.entity';
import { FiltersRoomDto } from './dtos/filters-rooms.dto';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private serviceRoom: RoomsService) {}
  // GET ALL ROOMS
  @ApiOperation({ summary: 'endpoint that fetches all rooms' })
  @ApiOkResponse({
    type: Room,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: "the server couldn't fetch the rooms",
  })
  @Get()
  getAll(@Query() filters: FiltersRoomDto) {
    return this.serviceRoom.getAll(filters);
  }

  //   GET ROOM BY ROOM NUMBER
  @ApiOperation({ summary: 'endpoint that fetches a room by room number' })
  @ApiOkResponse({
    type: Room,
  })
  @Get(':roomNumber')
  getById(@Param('roomNumber') roomNumber: number) {
    const number = Number.isNaN(Number(roomNumber));
    if (Number.isNaN(Number(roomNumber)))
      throw new NotFoundException('invalid roomNumber');
    return this.serviceRoom.getByRoomNum(Number(roomNumber));
  }

  //   CREATE ROOM
  @ApiOperation({ summary: 'endpoint that creates a room' })
  @ApiOkResponse({
    type: Room,
  })
  @Post()
  create(@Body() body: CreateRoomDto) {
    return this.serviceRoom.create(body);
  }

  //   UPDATE ROOM
  @ApiOperation({ summary: 'endpoint that updates a room' })
  @HttpCode(204)
  @Patch(':roomNumber')
  update(@Param('roomNumber') roomNum: number, @Body() body: UpdateRoomDto) {
    if (Number.isNaN(Number(roomNum)))
      throw new NotFoundException('invalid roomNumber');
    return this.serviceRoom.update(roomNum, body);
  }

  //   DELETE ROOM
  @ApiOperation({ summary: 'endpoint that updates a room' })
  @HttpCode(204)
  @Delete(':roomNumber')
  deleteRoom(@Param('roomNumber') roomNum: number) {
    if (Number.isNaN(Number(roomNum)))
      throw new NotFoundException('invalid roomNumber');
    return this.serviceRoom.delete(roomNum);
  }
}
