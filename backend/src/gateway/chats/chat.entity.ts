import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  title: string;

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];
}
