import express from 'express';
import { Role } from '../DB/entities/role';
import { Permission } from '../DB/entities/permission';
import { User } from '../DB/entities/user';

const router = express.Router();

router.post('/newRole', async (req, res) => {

  const newRole = new Role();

  newRole.name = req.body.roleName;

  const newPermision = new Permission();

  newPermision.name = req.body.permissionName;

  const permissions = newRole.permissions = [];

  newRole.permissions = [...newRole.permissions, newPermision];

  await newPermision.save();

  await newRole.save()
    .then(() => {
      res.status(201).json({
        message: "new Role created with its Permission ",
        newRole
      })
    })

    .catch((err) => {
      console.error('Error creating role:', err);
      res.status(500).json({ error: 'Error creating role' });
    })

})



router.post('/assignRole', async (req, res) => {
  try {
    const { roleId, userId } = req.body;

    const user = await User.findOneBy({ id: userId })
    const role = await Role.findOneBy({ id: roleId });

    if (!user || !role) {
      return res.status(404).send("user or role not found ");
    }

    if (role.permissions.length === 0) {
      res.send("this role doesnt have any permission")
    }

    user.roles = [...user.roles, role];
    await user.save();

    res.status(200).json({ message: 'Role assigned successfully' });

  } catch (error) {

    console.error('Error assigning role to user:', error);

    res.status(500).json({ error: 'Error assigning role to user' });

  }

});


export default router;      