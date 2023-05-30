import app from '../src/application';
import request from 'supertest';

const careRecipientId = 'e3e2bff8-d318-4760-beea-841a75f00227';
const visitId = "ef22785b-4b73-4099-bb03-d7d5e5b7fb11";

describe('/events/:care_recipient_id/visits', () => {
  it('returns a list of events for an individual', async () => {
    await request(app)
    .get(`/events/${careRecipientId}/visits`)
    .expect(200)
    .expect((res) => {
      expect(res.body.total).toBeGreaterThan(0)
    })
  })

  it('groups events by visit_id', async () => {
    await request(app)
    .get(`/events/${careRecipientId}/visits`)
    .expect(200)
    .expect((res) => {
      expect(res.body.eventsGroupedByVisit).toBeInstanceOf(Array)
    })
  })

  it('groups visits on their timestamp', async () => {
    await request(app)
    .get(`/events/${careRecipientId}/visits`)
    .expect(200)
    .expect((res) => {
      expect(res.body.visitsGroupedByDate).toBeInstanceOf(Array)
    })
  })

  it('returns an id, a data and array of events for a visit', async () => {
    await request(app)
    .get(`/events/${careRecipientId}/visits`)
    .expect(200)
    .expect((res) => {
      const visit = res.body.eventsGroupedByVisit[0];
      expect(visit).toHaveProperty('visit_id');
      expect(visit).toHaveProperty('visit_date');
      expect(visit).toHaveProperty('events');
      expect(visit.events[0]).toHaveProperty('id');
      expect(visit.events[0]).toHaveProperty('caregiver_id');
    })
  })

  it('returns a date and a visit_count for visits grouped by date', async () => {
    await request(app)
    .get(`/events/${careRecipientId}/visits`)
    .expect(200)
    .expect((res) => {
      const visit = res.body.visitsGroupedByDate[0];
      expect(visit).toHaveProperty('date');
      expect(visit).toHaveProperty('visit_count');
    })
  })

  it('handles missing query params', async () => {
    await request(app)
    .get(`/events//visits`)
    .expect(404)  
  })
})

describe('/events/:care_recipient_id/visits', () => {
  it('returns a list of events for an individual', async () => {
    await request(app)
    .get(`/events/${careRecipientId}/visits/${visitId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.total).toBeGreaterThan(0)
    })
  })

  it('returns an array of events', async () => {
    await request(app)
    .get(`/events/${careRecipientId}/visits/${visitId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.events).toBeInstanceOf(Array)
      expect(res.body.events[0]).toHaveProperty('id');
      expect(res.body.events[0]).toHaveProperty('timestamp');
    })
  })

  it('returns a check in time for the visit', async () => {
    await request(app)
    .get(`/events/${careRecipientId}/visits/${visitId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.checkInTime).toBeTruthy
    })
  })

  it('returns a check out time for the visit', async () => {
    await request(app)
    .get(`/events/${careRecipientId}/visits/${visitId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.checkOutTime).toBeTruthy
    })
  })

  it('returns null if the visit has no check out time', async () => {
    await request(app)
    .get(`/events/${careRecipientId}/visits/c5ddcae5-75f7-4bf0-9114-1c2a643488f3`)
    .expect(200)
    .expect((res) => {
      expect(res.body.checkOutTime).toBeFalsy
    })
  })

  it('returns a visit date time for the visit', async () => {
    await request(app)
    .get(`/events/${careRecipientId}/visits/${visitId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.visitDate).toBeTruthy
    })
  })

  it('handles missing query params', async () => {
    await request(app)
    .get(`/events//visits/`)
    .expect(404)  
  })
})