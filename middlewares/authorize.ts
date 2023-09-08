import express from 'express';
import { User } from '../DB/entities/user';

export async function authorizeAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {

    const userId = req.body.userId;
    const user = await User.findOneBy({ id: userId });
    if (user) {
        const roles = user.roles.filter((role) => role.name === "admin");
        // console.log(roles);

        if (roles.length === 0) {
            res.status(403).json({ message: 'Permission denied . You dont have the necessary roles ' });
        }
    }
    else {
        res.status(404).send("there is no user ");
    }

    next();
}

