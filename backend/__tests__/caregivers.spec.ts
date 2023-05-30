import app from '../src/application';
import request from 'supertest';

describe('/caregivers', () => {
  it('returns all/multiple caregivers', async () => {
    await request(app)
    .get(`/caregivers`)
    .expect(200)
    .expect((res) => {
      expect(res.body.data.length).toBeGreaterThan(0);
    })
  })

  it('returns all attributes for each caregiver', async () => {
    await request(app)
    .get(`/caregivers`)
    .expect(200)
    .expect((res) => {
      const firstCaregiver = res.body.data[0]
      expect(firstCaregiver).toHaveProperty('id');
      expect(firstCaregiver).toHaveProperty('first_name');
      expect(firstCaregiver).toHaveProperty('last_name');
    });
  })
});