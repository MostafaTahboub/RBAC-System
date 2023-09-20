import request from 'supertest'; 
import dataSource, { initDB } from "../DB/dataSource"
import { Profile } from "../DB/entities/profile";
import { User } from "../DB/entities/user";
import userRouter from '../routes/user.route';
import express from 'express';
import { createServer } from 'http';

const app =express();
const server = createServer(app);

beforeAll(async()=>{
   await initDB();
});

afterAll(async()=>{
await dataSource.destroy();
});


describe('POST /user/newUser', () => {
    
    it('should create a new user and return 201 status', async () => {

      const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
    };

    const response = await request(server)
      .post('/user/newUser')
      .send(newUser)

    // expect(response.text).toBe('User created successfully');

    // You can also perform additional assertions to check if the user was created in the database
    const createdUser = await User.findOneBy({ email: newUser.email });
    const createdProfile = await Profile.findOneBy({ firstName: newUser.firstName });

    expect(createdUser).toBeTruthy();
    expect(createdProfile).toBeTruthy();
  });

  // Add more test cases for error scenarios if needed
  it('should return a 500 status when there is an error', async () => {
    // Simulate an error scenario, e.g., by sending invalid data
    const invalidData = {
      name: 'Invalid User',
      email: 'invalid-email', // Invalid email format
      password: 'password123',
      firstName: 'Invalid',
      lastName: 'User',
    };

    const response = await request(server)
      .post('/user/newUser')
      .send(invalidData)
      .expect(500);

    expect(response.text).toBe('something went wrong');
  });
});

// Close the server after all tests are done
afterAll(() => {
  server.close();
});
