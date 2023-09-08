import express from 'express';
import { Permission } from '../DB/entities/permission';
import { authorizeAdmin } from '../middlewares/authorize';

const router = express.Router();

router.post('/newPermision', authorizeAdmin, async (req, res) => {
    try {

        const name = req.body.name;

        const newPermision = Permission.create();
        newPermision.name = name;

        await newPermision.save();
        res.status(201).json(newPermision);

    } catch (error) {
        console.log("Error creating Permission : " + error);
        res.status(500).json({ error: 'error creating Permission ' });
    }




})
export default router;