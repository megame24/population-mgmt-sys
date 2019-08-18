const request = require('supertest');
const app = require('../../index');
const models = require('../../database/models');

const { User } = models;

let token;
let adminToken;
let location1Id;
describe('Locations routes', () => {
  beforeAll((done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        name: 'name',
        password: 'P@ssw0rd',
        email: 'location_test@email.com'
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  beforeAll((done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        name: 'admin',
        password: 'P@ssw0rd',
        email: 'admin_location_test@email.com'
      })
      .end(async (err, res) => {
        await User.update({ role: 'admin' }, { where: { email: 'admin_location_test@email.com' } });
        adminToken = res.body.token;
        done();
      });
  });
  describe('Testing create location', () => {
    it('Should return 401 if token is not present', (done) => {
      request(app)
        .post('/api/locations')
        .send({})
        .expect(401)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('Token not present or invalid');
          done();
        });
    });
    it('Should return 401 if invalid token is provided', (done) => {
      request(app)
        .post('/api/locations')
        .set({
          token: 'invalid_token'
        })
        .send({})
        .expect(401)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('Token not present or invalid');
          done();
        });
    });
    it('Should return 403 if user is not an admin', (done) => {
      request(app)
        .post('/api/locations')
        .set({ token })
        .send({})
        .expect(403)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('Permission denied');
          done();
        });
    });
    it('Should return 400 if name is not provided', (done) => {
      request(app)
        .post('/api/locations')
        .set({ token: adminToken })
        .send({})
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('The field name is required');
          done();
        });
    });
    it('Should return 400 if femalePopulation is not provided', (done) => {
      request(app)
        .post('/api/locations')
        .set({ token: adminToken })
        .send({
          name: 'Lagos'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('The field femalePopulation is required');
          done();
        });
    });
    it('Should return 400 if femalePopulation is not an integer', (done) => {
      request(app)
        .post('/api/locations')
        .set({ token: adminToken })
        .send({
          name: 'Lagos',
          femalePopulation: 'not_an_integer'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('The field femalePopulation must be an integer');
          done();
        });
    });
    it('Should return 400 if malePopulation is not provided', (done) => {
      request(app)
        .post('/api/locations')
        .set({ token: adminToken })
        .send({
          name: 'Lagos',
          femalePopulation: 200
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('The field malePopulation is required');
          done();
        });
    });
    it('Should return 400 if malePopulation is not an integer', (done) => {
      request(app)
        .post('/api/locations')
        .set({ token: adminToken })
        .send({
          name: 'Lagos',
          femalePopulation: 200,
          malePopulation: 'not_an_integer'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('The field malePopulation must be an integer');
          done();
        });
    });
    it('Should return 400 if parentId is not an integer', (done) => {
      request(app)
        .post('/api/locations')
        .set({ token: adminToken })
        .send({
          name: 'Lagos',
          femalePopulation: 200,
          malePopulation: 300,
          parentId: 'id'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('The field parentId must be an integer');
          done();
        });
    });
    it('Should return 404 if parent belonging to the specified id is not found', (done) => {
      request(app)
        .post('/api/locations')
        .set({ token: adminToken })
        .send({
          name: 'Lagos',
          femalePopulation: 200,
          malePopulation: 300,
          parentId: 1
        })
        .expect(404)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('Parent location not found');
          done();
        });
    });
    it('Should create a location if all checks pass', (done) => {
      request(app)
        .post('/api/locations')
        .set({ token: adminToken })
        .send({
          name: 'Lagos',
          femalePopulation: 200,
          malePopulation: 300
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body).toHaveProperty('location');
          expect(res.body.location).toHaveProperty('femalePopulation');
          expect(res.body.location.femalePopulation).toEqual(200);
          location1Id = res.body.location.id;
          done();
        });
    });
  });
  describe('Testing update location', () => {
    it('Should return 403 if user is not an admin', (done) => {
      request(app)
        .put(`/api/locations/${location1Id}`)
        .set({ token })
        .send({})
        .expect(403)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('Permission denied');
          done();
        });
    });
    it('Should return 400 if femalePopulation is not an integer', (done) => {
      request(app)
        .put(`/api/locations/${location1Id}`)
        .set({ token: adminToken })
        .send({
          femalePopulation: 'not_an_integer'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('The field femalePopulation must be an integer');
          done();
        });
    });
    it('Should return 400 if malePopulation is not an integer', (done) => {
      request(app)
        .put(`/api/locations/${location1Id}`)
        .set({ token: adminToken })
        .send({
          femalePopulation: 200,
          malePopulation: 'not_an_integer'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('The field malePopulation must be an integer');
          done();
        });
    });
    it('Should return 400 if parentId is not an integer', (done) => {
      request(app)
        .put(`/api/locations/${location1Id}`)
        .set({ token: adminToken })
        .send({
          femalePopulation: 200,
          malePopulation: 300,
          parentId: 'id'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('The field parentId must be an integer');
          done();
        });
    });
    it('Should return 404 if parent belonging to the specified id is not found', (done) => {
      request(app)
        .put(`/api/locations/${location1Id}`)
        .set({ token: adminToken })
        .send({
          femalePopulation: 200,
          malePopulation: 300,
          parentId: -1
        })
        .expect(404)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('Parent location not found');
          done();
        });
    });
    it('Should update a specified location if all checks pass', (done) => {
      request(app)
        .put(`/api/locations/${location1Id}`)
        .set({ token: adminToken })
        .send({
          femalePopulation: 900
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).toHaveProperty('location');
          expect(res.body.location).toHaveProperty('femalePopulation');
          expect(res.body.location.femalePopulation).toEqual(900);
          done();
        });
    });
  });
  describe('Testing delete location', () => {
    it('Should return 403 if user is not an admin', (done) => {
      request(app)
        .delete(`/api/locations/${location1Id}`)
        .set({ token })
        .send({})
        .expect(403)
        .end((err, res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error.message).toEqual('Permission denied');
          done();
        });
    });
    it('Should delete a specified location if all checks pass', (done) => {
      request(app)
        .delete(`/api/locations/${location1Id}`)
        .set({ token: adminToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          done();
        });
    });
  });
  describe('Testing get locations', () => {
    it('Should return an array of locations', (done) => {
      request(app)
        .get('/api/locations/')
        .set({ token })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('locations');
          expect(res.body.locations.length).toBeGreaterThanOrEqual(0);
          done();
        });
    });
  });
});
