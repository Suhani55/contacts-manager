const request = require('supertest')
const app = require('../app')

test('contacts endpoint protected', async () => {
  const res = await request(app).get('/api/contacts')
  expect(res.statusCode).toBe(401)
})