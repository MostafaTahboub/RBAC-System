import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Profile } from "./entities/profile";
import { Role } from "./entities/role";   
import { Permission } from "./entities/permission";
import 'dotenv/config';
require('dotenv').config();


const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HSOT,
    port: Number(process.env.PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,   
    entities: [User,Profile,Role,Permission],    
    // migrations: ['dist/migrations/*.js'],     
    synchronize: false  ,   
    logging: true             

});
      

export default dataSource;       