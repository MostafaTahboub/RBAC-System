import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role';

@Entity()
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    name: string;

    @ManyToMany(() => Role, (role) =>role.permissions)
    roles: Role[];
  
    
  }
