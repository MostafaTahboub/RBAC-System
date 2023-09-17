import { User } from "../DB/entities/user"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        throw ("invalid username or password");
    }
}

export { login };

