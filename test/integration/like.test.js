const request = require('supertest');
// const { Files } = require('../../models/file');
const { Like } = require('../../models/like');

describe('/like', () => {
  let server;

  beforeEach(async () => {
    server = require('../../index');
  });
  afterEach(async () => {
    server.close();
  });

  describe('GET/', () => {
    const execute = () => {
      return request(server).get('/like');
    };

    it('Should return all liked files on GET request', async () => {
      const res = await execute();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'Ongoing projects.txt')).toBeTruthy();
      expect(res.body.some(g => g.name === 'pug.jpg')).toBeTruthy();
    });
  });

  describe('GET/:id', () => {
    const execute = (id) => {
      return request(server).get(`/like/${id}`);
    };

    it('should return 400 if id is not provided', async () => {
      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 400 if id is undefined', async () => {
      const res = await execute('undefined');

      expect(res.status).toBe(400);
    });

    it('should return 404 if id is not found', async () => {
      const res = await execute('909');

      expect(res.status).toBe(404);
    });

    it('should return 200 if request is valid', async () => {
      const id = '4';

      const res = await execute(id);

      expect(res.status).toBe(200);
    });

    it('should match response data with DB function: findOneById', async () => {
      const id = '4';

      const res = await execute(id);
      const file = Like.findOneById(id);

      expect(res.body[0]).toEqual(file[0]);
    });
  });

  describe('POST/', () => {
    const execute = (data) => {
      return request(server)
        .post('/like')
        .send(data);
    };

    it('should return 400 if id is empty', async () => {
      const id = '';
      const like = false;

      const res = await execute({ id, like });

      expect(res.status).toBe(400);
    });

    it('should return 400 if id is undefined', async () => {
      const id = undefined;
      const like = false;

      const res = await execute({ id, like });

      expect(res.status).toBe(400);
    });

    it('should return 400 if id is not provided', async () => {
      const like = false;

      const res = await execute({ like });

      expect(res.status).toBe(400);
    });

    it('should return 400 if id is not a string', async () => {
      const id = 4
      const like = false;

      const res = await execute({ id, like });

      expect(res.status).toBe(400);

    });

    it('should return 400 if like is not boolean', async () => {
      // TODO
    });

    it('should return 400 if like is not provided', async () => {
      // TODO
    });

    it('should return 200 and findOneById to be undefined if file is unliked', async () => {
      const id = '4';
      const like = false;

      const res = await execute({ id, like });
      const file = Like.findOneById(id);

      expect(res.status).toBe(200);
      expect(file).toBe(undefined);
    });

    it('should return 200 and match findOneById if file is liked', async () => {
      const id = '5';
      const like = true;

      const res = await execute({ id, like });
      const file = Like.findOneById(id);

      expect(res.status).toBe(200);
      expect(res.body[0]).toEqual(file[0]);
    });
  });
});