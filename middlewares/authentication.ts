import jwt from 'jsonwebtoken';
import express, { json } from 'express';
import { User } from '../DB/entities/user';

const authinticate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const token = req.headers["authorization"] || '';

    let tokenIsValid;

    try {

        jwt.verify(token, process.env.SECRET_KEY || '');

    } catch (error) {

        console.log("the token is invalid : " + error);
    }

    if (tokenIsValid) {
        const decoded = jwt.decode(token, { json: true });
        const user = await User.findOneBy({ email: decoded?.email });
        res.locals.user = user;
        next();
    }

    else {
        res.status(401).send("you are unauthorized ");
    }
}

export {
    authinticate
}