import { Entity, BaseEntity, Column, BeforeInsert, JoinColumn, ManyToMany, JoinTable, EntityMetadata, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import bcrypt from 'bcrypt';
import { Profile } from './profile';
import { Role } from './role';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ nullable: false, length: 255 })
    name: string

    @Column()
    email: string

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10)
        }
    }
    @Column({ nullable: false })
    password: string


    @ManyToMany(() => Role ,(role)=>role.users,{eager:true})
    @JoinTable()
    roles: Role[];

    @OneToOne(() => Profile ,{eager:true})
    @JoinColumn()
    profile: Profile



}