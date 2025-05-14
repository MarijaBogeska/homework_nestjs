import { PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';

export default class UpdateRoomDto extends PartialType(CreateRoomDto) {}
