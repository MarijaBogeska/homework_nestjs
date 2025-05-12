import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum RoomTypes {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  SUITE = 'SUITE',
  DELUXE = 'DELUXE',
}
@Entity()
export class Room {
  @ApiProperty({
    description: 'Number of the room',
    example: 22,
    minimum: 1,
    maximum: 999,
  })
  @PrimaryColumn({ unique: true })
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
  @Column({
    type: 'enum',
    enum: RoomTypes,
    default: RoomTypes.SINGLE,
  })
  type: RoomTypes;

  @ApiProperty({
    description: 'Price for the room',
    example: 60,
    minimum: 50,
    maximum: 1000,
  })
  @Column()
  price: number;

  @ApiProperty({
    description: 'Room availability',
    examples: [true, false],
  })
  @Column({
    type: 'boolean',
    default: true,
  })
  isAvailable: boolean;

  @ApiProperty({
    description: 'Amenities in a room',
    examples: ['WiFi', 'TV', 'Air Conditioning'],
  })
  @Column({
    type: 'text',
    array: true,
    default: ['TV'],
  })
  amenities: string[];

  @ApiProperty({
    description: 'The maximum amount of guests that can stay in a room',
    example: 2,
    minimum: 1,
    maximum: 4,
  })
  @Column({
    type: 'int',
    default: 1,
  })
  maxOccupancy: number;

  @ApiProperty({
    description: 'The date when the room was last cleaned',
    example: '2024-01-01 09:00:00',
  })
  @Column({ type: 'timestamp without time zone', nullable: false })
  lastCleaned: Date;

  @ApiProperty({
    description:
      'Information about any maintenance-related issues, updates, or tasks associated with a room',
    example: 'TV remote missing, replacement ordered',
  })
  @Column({ type: 'varchar', nullable: true })
  maintenceNotes?: string;
}
