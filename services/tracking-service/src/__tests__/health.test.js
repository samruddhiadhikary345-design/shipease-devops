jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    connect: jest.fn(() => Promise.resolve())
  };
});

const request = require('supertest');
const app = require('../index');
const { closeServer } = require('../index');

afterAll(() => { closeServer(); });

describe('Tracking Service health endpoint', () => {
  it('returns the service status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 'UP',
      service: 'tracking-service'
    });
  });
});