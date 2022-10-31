const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();
const bcrypt = require('bcrypt');

const app = require('../../app');
const { User } = require('../models/user');

const { DB_TEST_HOST, PORT } = process.env;

describe('test auth controllers', () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach(done => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach(done => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test('test login controller', async () => {
    const hashPassword = await bcrypt.hash('123456', 10);
    const newUser = {
      email: 'newuser1@gmail.com',
      password: hashPassword,
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: 'newuser1@gmail.com',
      password: '123456',
    };

    const response = await request(app).post('/api/auth/login').send(loginUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toByTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
    expect(body.user.email).stringContaining();
    expect(body.user.subscription).stringContaining();
  });
});
