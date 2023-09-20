import { User } from "../DB/entities/user"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NSUser } from "../types/user";
import { Profile } from "../DB/entities/profile";


const insertUser=async(payloda:NSUser.user , payloadProf:NSUser.profile)=>{

try {
    
    const newProfile = Profile.create({
    ...payloadProf
      })
  
 await newProfile.save();    
 
const newUser = User.create({
    ...payloda
 , profile:newProfile
}) 
await newUser.save(); 

} catch (error) {
     console.log("error ocurring while creating user with its profie " + error);    
}

}





const login = async (email: string, password: string) => {
    try {
        const user = await User.findOneBy({ email });

        const passwordMathcing = await bcrypt.compare(password, user?.password || '');
        
        if (user && passwordMathcing) {
            const token = jwt.sign({
                email: user.email,
                fullName: user.name
            },
                process.env.SECRET_KEY || ''
                ,
                {
                    expiresIn: "14 days"
                }
            );
            return token;
        }
        
        else {
            throw ("invalid username or token");
        }

    } catch (error) {
        throw ("invalid username or password..");
    }
}

export { login,insertUser };

