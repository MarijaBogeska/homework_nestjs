import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { RoomTypes } from '../entities/room.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Number of the room',
    example: 22,
    minimum: 1,
    maximum: 999,
  })
  @IsNumber()
  @Min(1)
  @Max(999)
  roomNumber: number;

  @ApiProperty({
    description: 'Room type',
    examples: [
      RoomTypes.SINGLE,
      RoomTypes.DOUBLE,
      RoomTypes.SUITE,
      RoomTypes.DELUXE,
    ],
  })
  @IsEnum(RoomTypes)
  type: RoomTypes;

  @ApiProperty({
    description: 'Price for the room',
    example: 60,
    minimum: 50,
    maximum: 1000,
  })
  @IsNumber()
  @Min(50)
  @Max(1000)
  price: number;

  @ApiProperty({
    description: 'Room availability',
    examples: [true, false],
  })
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({
    description: 'Amenities in a room',
    examples: ['WiFi', 'TV', 'Air Conditioning'],
  })
  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @ApiProperty({
    description: 'The maximum amount of guests that can stay in a room',
    example: 2,
    minimum: 1,
    maximum: 4,
  })
  @IsNumber()
  @Min(1)
  @Max(4)
  maxOccupancy: number;

  @ApiProperty({
    description: 'The date when the room was last cleaned',
    example: '2024-01-01 09:00:00',
  })
  @IsDate()
  lastCleaned: Date;

  @ApiProperty({
    description:
      'Information about any maintenance-related issues, updates, or tasks associated with a room',
    example: 'TV remote missing, replacement ordered',
  })
  @IsOptional()
  @IsString()
  maintenceNotes: string;
}
