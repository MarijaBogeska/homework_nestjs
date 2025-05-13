import { User } from 'src/users/entites/user-entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  zipCode: string;

  @OneToOne(() => User, (user) => user.userAddress)
  @JoinColumn()
  user: User;
}
