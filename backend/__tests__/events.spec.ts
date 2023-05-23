import app from '../src/application';
import request from 'supertest';

const recipient = { id: 'df50cac5-293c-490d-a06c-ee26796f850d' }
// const visit_id = "5cd753f0-8b66-f8a8-43f7-330f62a3e1d6";

// describe('/events/:some_id', () => {
//   it('Returns a 200', async () => {
//     await request(app)
//       .get(`/events/${recipient.id}`)
//       .expect(200)
//       .then((res) => {
//         console.log(res)

//         console.log(res.body)
//         // expect(res.body.status).toBe('success')
//       })
//       // .expect((res) => {
//       //   console.log(res)
//       //   expect(res.body.status).toContain('success');
//       // });
//   })
// });

describe('/events/:care_recipient_id', () => {
  it('returns a paginated list of events for an individual', async () => {
    await request(app)
    .get(`/events/${recipient.id}`)
    .expect(200)
    .expect((res) => {
      console.log(res.body.totalItems)
    })
  })
})