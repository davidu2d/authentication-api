import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tenants' })
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  database_host: string;

  @Column()
  database_user: string;

  @Column()
  database_password: string;

  @Column()
  database_port: number;

  @Column()
  database_name: string;

  @Column()
  secret_jwt: string;

  @Column()
  public_secret_jwt: string;

  @Column()
  status: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
