const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
import { User } from "../DB/entities/user";
import { Role } from "../DB/entities/role";
const router = express.Router();

const app = express();
app.use(bodyParser.json());
app.use('/api', router);

const server = app.listen(3000);

describe('POST /api/assignRole', () => {
  afterAll(() => {
    server.close();
  });

  it('should assign a role to a user and return a success message', async () => {
    User.findOneBy = jest.fn().mockResolvedValue({ id: 'user456', roles: [] });
    Role.findOneBy = jest.fn().mockResolvedValue({ id: 'role123', permissions: ['read'] });

    const response = await request(server)
      .post('/api/assignRole')
      .send({ roleId: 'role123', userId: 'user456' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Role assigned successfully');

    const updatedUser = await User.findOneBy({ id: 2 });
    expect(updatedUser?.roles).toContainEqual({ id: 'role123', permissions: ['read'] });
  });

  it('should handle the case when the user or role is not found', async () => {
    User.findOneBy = jest.fn().mockResolvedValue(null);
    Role.findOneBy = jest.fn().mockResolvedValue(null);

    const response = await request(server)
      .post('/api/assignRole')
      .send({ roleId: 'role123', userId: 'user456' });

    expect(response.status).toBe(404);
    expect(response.text).toBe('user or role not found');
  });

  it('should handle the case when the role has no permissions', async () => {
    User.findOneBy = jest.fn().mockResolvedValue({ id: 'user456', roles: [] });
    Role.findOneBy = jest.fn().mockResolvedValue({ id: 'role123', permissions: [] });

    const response = await request(server)
      .post('/api/assignRole')
      .send({ roleId: 'role123', userId: 'user456' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('this role doesnt have any permission');
  });

  it('should handle errors during role assignment', async () => {
    User.findOneBy = jest.fn().mockResolvedValue({ id: 'user456', roles: [] });
    Role.findOneBy = jest.fn().mockResolvedValue({ id: 'role123', permissions: ['read'] });

    User.prototype.save = jest.fn(() => {
      throw new Error('Test error');
    });

    const response = await request(server)
      .post('/api/assignRole')
      .send({ roleId: 'role123', userId: 'user456' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Error assigning role to user');
  });
});
