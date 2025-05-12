import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { RoomTypes } from '../entities/room.entity';

export class FiltersRoomDto {
  // Search by room number
  @IsOptional()
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

  // Filter by type
  @IsOptional()
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

  // Filter by price range
  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(1000)
  @ApiProperty({ example: 60, description: 'Minimum room price' })
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(1000)
  @ApiProperty({ example: 200, description: 'Maximum room price' })
  maxPrice?: number;

  // Filter by availability
  @IsOptional()
  @ApiProperty({
    description: 'Room availability',
    examples: [true, false],
  })
  @IsBoolean()
  isAvailable: boolean;
}
