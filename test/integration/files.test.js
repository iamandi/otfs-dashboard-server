const request = require('supertest');
const { Files } = require('../../models/file');

describe('/home', () => {
  let server;

  beforeEach(async () => {
    server = require('../../index');
  });
  afterEach(async () => {
    server.close();
  });

  describe('GET/folder', () => {
    const execute = () => {
      return request(server).get('/home/folder');
    };

    it('should return 400 if folder by the given id not found', async () => {
      const res = await execute();
      expect(res.status).toBe(404);
    });
  });

  describe('GET/folder/:parentId', () => {
    const execute = (parentId) => {
      return request(server).get(`/home/folder/${parentId}`);
    };

    it('should return 400 if parentId is not provided', async () => {
      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 400 if parentId is empty', async () => {
      const res = await execute('');

      expect(res.status).toBe(404);
    });

    it('should return 400 if parentId is undefined', async () => {
      const res = await execute('undefined');

      expect(res.status).toBe(400);
    });

    it('should return 200 with empty body if parentId folder is empty', async () => {
      const res = await execute('17');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });

    it('should return 404 if parentId folder is not found', async () => {
      const res = await execute('909');

      expect(res.status).toBe(404);
    });

    it('should return 200 if request is valid', async () => {
      const parentId = '0';

      const res = await execute(parentId);

      expect(res.status).toBe(200);
    });

    it('should match response data with DB function: findAllByParentId', async () => {
      const parentId = '2';

      const res = await execute(parentId);
      const file = Files.findAllByParentId(parentId);

      expect(res.body[0]).toEqual(file[0]);
    });
  });

  describe('GET/folder-by-id/:id', () => {
    const execute = (folderId) => {
      return request(server).get(`/home/folder-by-id/${folderId}`);
    };

    it('should return 404 if folderId is empty', async () => {
      const res = await execute('');
      expect(res.status).toBe(404);
    });

    it('should return 400 if folderId is not provided', async () => {
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it('should return 400 if folderId is undefined', async () => {
      const res = await execute(undefined);
      expect(res.status).toBe(400);
    });

    it('should return 404 if folderId is not found', async () => {
      const folderId = '121'
      const res = await execute(folderId);
      expect(res.status).toBe(404);
    });

    it('should return 200 if request is valid', async () => {
      const folderId = '1';
      const res = await execute(folderId);
      expect(res.status).toBe(200);
    });

    it('should match response data with DB function: findOneById', async () => {
      const folderId = '2';

      const res = await execute(folderId);
      const file = Files.findOneById(folderId);

      expect(res.body[0]).toEqual(file[0]);
    });
  });

  describe('GET/file/:id', () => {
    const execute = (fileId) => {
      return request(server).get(`/home/file/${fileId}`);
    };

    it('should return 404 if fileId is empty', async () => {
      const res = await execute('');
      expect(res.status).toBe(404);
    });

    it('should return 400 if fileId is not provided', async () => {
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it('should return 400 if fileId is undefined', async () => {
      const res = await execute(undefined);
      expect(res.status).toBe(400);
    });

    it('should return 400 if folder is being accessed using fileId', async () => {
      const fileId = '1'
      const res = await execute(fileId);
      expect(res.status).toBe(400);
    });

    it('should return 404 if fileId is not found', async () => {
      const fileId = '121'
      const res = await execute(fileId);
      expect(res.status).toBe(404);
    });

    it('should return 200 if request is valid', async () => {
      const fileId = '5';
      const res = await execute(fileId);
      expect(res.status).toBe(200);
    });

    it('should match response data with content of physical file - NOT IMPLEMENTED', async () => {
      expect(1).toEqual(1);
    });
  });


  // describe('POST/', () => {
  //   const execute = () => {
  //     return request(server)
  //       .post('/api/customers')
  //       .set('x-auth-token', token)
  //       .send({ name, phone, isGold });
  //   };

  //   it('should return if not token provided', async () => {
  //     token = '';

  //     const res = await execute();

  //     expect(res.status).toBe(401);
  //   });

  //   it('should return 400 if customer name is less than 3 character', async () => {
  //     name = '12';

  //     const res = await execute();

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 400 if customer phone is less than 5 character', async () => {
  //     phone = '1234';

  //     const res = await execute();

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 400 if customer name is more than 255 character', async () => {
  //     name = new Array(257).join('a');

  //     const res = await execute();

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 400 if customer phone is more than 255 character', async () => {
  //     phone = new Array(257).join('a');

  //     const res = await execute();

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 400 if customer phone is more than 255 character', async () => {
  //     isGold = '';

  //     const res = await execute();

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 200 if request is valid', async () => {
  //     const res = await execute();

  //     expect(res.status).toBe(200);
  //   });

  //   it('should add the given customer into the db if request is valid', async () => {
  //     name = 'newName';
  //     phone = 'newPhone';
  //     isGold = true;

  //     await execute();
  //     const customer = await Customer.findOne({ name: 'newName' });

  //     expect(customer).toBeDefined();
  //   });

  //   it('should send customer to user', async () => {
  //     const res = await execute();

  //     expect(res.body).toHaveProperty('_id');
  //     expect(res.body).toHaveProperty('name', '123');
  //     expect(res.body).toHaveProperty('phone', '12345');
  //     expect(res.body).toHaveProperty('isGold', false);
  //   });
  // });

  // describe('PUT/', () => {
  //   const execute = () => {
  //     return request(server)
  //       .put(`/api/customers/${customerId}`)
  //       .set('x-auth-token', token)
  //       .send({ name, phone, isGold });
  //   };

  //   it('should return if not token provided', async () => {
  //     token = '';

  //     const res = await execute();

  //     expect(res.status).toBe(401);
  //   });

  //   it('should return 400 if customer name is less than 3 character', async () => {
  //     name = '12';

  //     const res = await execute();

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 400 if customer phone is less than 5 character', async () => {
  //     phone = '1234';

  //     const res = await execute();

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 400 if customer name is more than 255 character', async () => {
  //     name = new Array(257).join('a');

  //     const res = await execute();

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 400 if customer phone is more than 255 character', async () => {
  //     phone = new Array(257).join('a');

  //     const res = await execute();

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 400 if customer phone is more than 255 character', async () => {
  //     isGold = '';

  //     const res = await execute();

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 200 if requset is valid', async () => {
  //     const res = await execute();

  //     expect(res.status).toBe(200);
  //   });

  //   it('should change the given customer into the db if request is valid', async () => {
  //     name = 'newName';
  //     phone = 'newPhone';
  //     isGold = true;

  //     await execute();
  //     const customer = await Customer.findOne({ name: 'newName' });

  //     expect(customer).toBeDefined();
  //   });

  //   it('should send edited customer to user if requset is valid', async () => {
  //     name = 'newName';
  //     phone = 'newPhone';
  //     isGold = true;

  //     const res = await execute();

  //     expect(res.body).toHaveProperty('_id');
  //     expect(res.body).toHaveProperty('name', 'newName');
  //     expect(res.body).toHaveProperty('phone', 'newPhone');
  //     expect(res.body).toHaveProperty('isGold', true);
  //   });
  // });

  // describe('DELETE/', () => {
  //   const execute = () => {
  //     return request(server)
  //       .delete(`/api/customers/${customerId}`)
  //       .set('x-auth-token', token);
  //   };
  //   it('should return 401 if no toke provided', async () => {
  //     token = '';

  //     const res = await execute();

  //     expect(res.status).toBe(401);
  //   });

  //   it('should return 404 if no customer by the given id', async () => {
  //     customerId = '1';

  //     const res = await execute();

  //     expect(res.status).toBe(404);
  //   });

  //   it('should return 200 request is valid', async () => {
  //     const res = await execute();

  //     expect(res.status).toBe(200);
  //   });

  //   it('should delete customer by the given id if request is valid', async () => {
  //     await execute();

  //     const customers = await Customer.find();

  //     expect(customers.length).toEqual(0);
  //   });

  //   it('should send deleted customer to user if request is valid', async () => {
  //     const res = await execute();

  //     expect(res.body).toHaveProperty('_id');
  //     expect(res.body).toHaveProperty('name', '123');
  //     expect(res.body).toHaveProperty('phone', '12345');
  //     expect(res.body).toHaveProperty('isGold', false);
  //   });
  // });
  // });
});