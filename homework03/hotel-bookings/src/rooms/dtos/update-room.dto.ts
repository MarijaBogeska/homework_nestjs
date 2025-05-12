import { ApiProperty } from '@nestjs/swagger';
import { RoomTypes } from '../entities/room.entity';
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

export default class UpdateRoomDto {
  @ApiProperty({
    description: 'Room type',
    examples: [
      RoomTypes.SINGLE,
      RoomTypes.DOUBLE,
      RoomTypes.SUITE,
      RoomTypes.DELUXE,
    ],
  })
  @IsOptional()
  @IsEnum(RoomTypes)
  type: RoomTypes;

  @ApiProperty({
    description: 'Price for the room',
    example: 60,
    minimum: 50,
    maximum: 1000,
  })
  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(1000)
  price: number;

  @ApiProperty({
    description: 'Room availability',
    examples: [true, false],
  })
  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({
    description: 'Amenities in a room',
    examples: ['WiFi', 'TV', 'Air Conditioning'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @ApiProperty({
    description: 'The maximum amount of guests that can stay in a room',
    example: 2,
    minimum: 1,
    maximum: 4,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(4)
  maxOccupancy: number;

  @ApiProperty({
    description: 'The date when the room was last cleaned',
    example: '2024-01-01 09:00:00',
  })
  @IsOptional()
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
