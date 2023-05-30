import app from '../src/application';
import request from 'supertest';

const careRecipientId = 'e3e2bff8-d318-4760-beea-841a75f00227';
// const visit_id = "5cd753f0-8b66-f8a8-43f7-330f62a3e1d6";

describe('/events/:care_recipient_id', () => {
  it('returns a paginated list of events for an individual', async () => {
    await request(app)
    .get(`/events/${careRecipientId}/visits`)
    .expect(200)
    .expect((res) => {
      console.log(res.body.totalItems)
    })
  })
})