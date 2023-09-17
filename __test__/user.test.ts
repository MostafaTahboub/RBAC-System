const app = require('../index');
const request = require('supertest');

import dataSource, { initDB } from '../DB/dataSource';
import { User } from '../DB/entities/user';

const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'testpassword',
  firstName: 'Test',
  lastName: 'User',
};

beforeAll(async () => {
  await initDB();
});

afterAll(async () => {
  await dataSource.destroy();
})

describe('POST /newUser', () => {
  it('should create a new user', async () => {

    const response = await request(app)
      .post('/newUser')
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.text).toBe('User created successfully ');

    const user = await User.findOneBy({ email: testUser.email });
    expect(user).not.toBeNull();
    expect(user?.name).toBe(testUser.name);
    expect(user?.profile).not.toBeNull();
  });

  it('should return an error if user creation fails', async () => {
  
    const response = await request(app)
      .post('/newUser')
      .send({ name: 'Invalid User' }); 

    expect(response.status).toBe(500);
    expect(response.text).toBe('something went wrong ');
  });
});


