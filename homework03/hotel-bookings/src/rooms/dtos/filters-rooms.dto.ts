import { ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional({
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
  @ApiPropertyOptional({
    description: 'Room type',
    enum: RoomTypes,
  })
  @IsEnum(RoomTypes)
  type: RoomTypes;

  // Filter by price range
  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(1000)
  @ApiPropertyOptional({ example: 60, description: 'Minimum room price' })
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(1000)
  @ApiPropertyOptional({ example: 200, description: 'Maximum room price' })
  maxPrice?: number;

  // Filter by availability
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Room availability',
    enum: [true, false],
  })
  @IsBoolean()
  isAvailable: boolean;
}
