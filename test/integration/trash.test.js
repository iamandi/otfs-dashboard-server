const request = require('supertest');
const { Files } = require('../../models/file');
const { Trash } = require('../../models/trash');

describe('/trash', () => {
  let server;

  beforeEach(async () => {
    server = require('../../index');
  });
  afterEach(async () => {
    server.close();
  });

  describe('GET/', () => {
    const execute = () => {
      return request(server).get('/trash');
    };

    it('Should return all trashed files on GET request', async () => {
      const res = await execute();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      console.log('res.body', res.body);
      expect(res.body.some(g => g.name === 'trashed1.txt')).toBeTruthy();
      expect(res.body.some(g => g.name === 'trashed2.txt')).toBeTruthy();
      expect(res.body.some(g => g.name === 'trashed3.txt')).toBeTruthy();
    });
  });

  describe('GET/:id', () => {
    const execute = (id) => {
      return request(server).get(`/trash/${id}`);
    };

    it('should return 400 if id is undefined', async () => {
      const res = await execute('undefined');

      expect(res.status).toBe(400);
    });

    it('should return 404 if id is not found', async () => {
      const res = await execute('909');

      expect(res.status).toBe(404);
    });

    it('should return 200 and match response data with DB:findOneLikedById if request is valid', async () => {
      const id = '41';

      const res = await execute(id);
      const file = Trash.findOneById(id);

      expect(res.status).toBe(200);
      expect(res.body[0]).toEqual(file[0]);
    });
  });

  describe('POST/', () => {
    const execute = (data) => {
      return request(server)
        .post('/trash')
        .send(data);
    };

    it('should return 400 if id is empty', async () => {
      const id = '';

      const res = await execute({ id });

      expect(res.status).toBe(400);
    });

    it('should return 400 if id is undefined', async () => {
      const id = undefined;

      const res = await execute({ id });

      expect(res.status).toBe(400);
    });

    it('should return 400 if id is not provided', async () => {
      const res = await execute({});

      expect(res.status).toBe(400);
    });

    it('should return 400 if id is not a string', async () => {
      const id = 4

      const res = await execute({ id });

      expect(res.status).toBe(400);

    });

    it('should return 404 if id is not found', async () => {
      const id = '443'

      const res = await execute({ id });

      expect(res.status).toBe(404);

    });

    it('should return 200 and file is not found in FileDB if file is trashed', async () => {
      const id = '5';

      const res = await execute({ id });
      const file = Files.findOneById(id);
      const trashFile = Trash.findOneById(id);

      expect(res.status).toBe(200);
      expect(file).toBe(undefined);
      expect(res.body.id).toEqual(trashFile.id);
      expect(res.body.name).toEqual(trashFile.name);
    });
  });

  describe('POST/restore', () => {
    const execute = (data) => {
      return request(server)
        .post('/trash/restore')
        .send(data);
    };

    it('should return 400 if id is empty', async () => {
      const id = '';

      const res = await execute({ id });

      expect(res.status).toBe(400);
    });

    it('should return 400 if id is undefined', async () => {
      const id = undefined;

      const res = await execute({ id });

      expect(res.status).toBe(400);
    });

    it('should return 400 if id is not provided', async () => {
      const res = await execute({});

      expect(res.status).toBe(400);
    });

    it('should return 400 if id is not a string', async () => {
      const id = 4

      const res = await execute({ id });

      expect(res.status).toBe(400);

    });

    it('should return 404 if id is not found', async () => {
      const id = '443'

      const res = await execute({ id });

      expect(res.status).toBe(404);

    });

    it('should return 200 and file is not found in TrashDB if file is restored', async () => {
      const id = '5';

      const res = await execute({ id });
      const file = Files.findOneById(id);
      const trashFile = Trash.findOneById(id);

      expect(res.status).toBe(200);
      expect(trashFile).toBe(undefined);
      expect(res.body.id).toEqual(file.id);
      expect(res.body.name).toEqual(file.name);
    });
  });

  describe('DELETE/', () => {
    const execute = (id) => {
      console.log('DELETE/ id', id);
      return request(server)
        .delete(`/trash/${id}`);
    };

    it('should return 404 if id is empty', async () => {
      const id = '';

      const res = await execute(id);

      expect(res.status).toBe(404);
    });

    it('should return 400 if id is undefined', async () => {
      const id = undefined;

      const res = await execute(id);

      expect(res.status).toBe(400);
    });

    it('should return 400 if id is not provided', async () => {
      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 404 if id is not found', async () => {
      const id = '4413'

      const res = await execute(id);

      expect(res.status).toBe(404);

    });

    it('should delete trashed file if request is valid', async () => {
      const id = '51';
      const res = await execute(id);

      const file = Trash.findOneById(id);

      expect(res.status).toBe(200);
      expect(file).toBe(undefined);
    });
  });
});