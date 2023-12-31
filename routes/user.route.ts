import express from 'express';
import { User } from '../DB/entities/user';
import { Profile } from '../DB/entities/profile';
import { insertUser, login } from '../controllers/user';
const router = express.Router();

router.post('/newUser', async (req, res) => {

    // const { name, email, password } = req.body;
    // const newUser = new User();
    
    // newUser.name = name;
    // newUser.email = email;
    // newUser.password = password;

    // const userProfile = new Profile();
    
    // userProfile.firstName = req.body.firstName;
    // userProfile.lastName = req.body.lastName;

    // await userProfile.save();
    
    // newUser.profile = userProfile;
    
    // await newUser.save()
    
    insertUser(req.body,req.body)
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

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    login(email, password)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(401).send(err);
      })
  });


export default router;