import express from 'express';
import { User } from '../DB/entities/user';
import { Profile } from '../DB/entities/profile';

const router = express.Router();

router.post('/newUser', async (req, res) => {

    const { name, email, password } = req.body;
    const newUser = new User();
    
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;

    const userProfile = new Profile();
    
    userProfile.firstName = req.body.firstName;
    userProfile.lastName = req.body.lastName;

    await userProfile.save();
    
    newUser.profile = userProfile;
    
    await newUser.save()
        .then(() => {
            res.status(201).send("User created successfully ");
        })
        .catch(() => {
            res.status(500).send("something went wrong ");
        })
});


router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    const user = await User.findOneBy({ id });

    if (user) {
        res.status(200).send(user);
    }
    else {
        res.status(404).send("user not found ");
    }

});


export default router;