import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './user';
import { Permission } from './permission';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Permission, (permission)=>permission.roles, {eager: true})
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(()=>User,(user)=>user.roles)
  users:User[]
 
}


