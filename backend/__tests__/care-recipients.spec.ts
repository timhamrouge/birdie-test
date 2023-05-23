import app from '../src/application';
import request from 'supertest';

describe('/care-recipients', () => {
  it('returns all/multiple care recipients', async () => {
    await request(app)
    .get(`/care-recipients`)
    .expect(200)
    .expect((res) => {
      expect(res.body.data.length).toBeGreaterThan(0);
    })
  })

  it('returns all attributes for each caregiver', async () => {
    await request(app)
    .get(`/care-recipients`)
    .expect(200)
    .expect((res) => {
      const firstCareRecipient = res.body.data[0]
      expect(firstCareRecipient).toHaveProperty('id');
      expect(firstCareRecipient).toHaveProperty('name');
    });
  })

  // TODO specs for error handling
});