import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  status: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @ManyToOne(() => Profile, { cascade: false })
  @JoinTable({ name: 'profile_id' })
  profile: Profile;
}
