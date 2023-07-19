import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
