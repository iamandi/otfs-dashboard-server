const request = require('supertest');
const { Files } = require('../../models/files');

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
      // expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      // expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
      // expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
    });
  });

  // describe('GET/:id', () => {
  //   const execute = (id) => {
  //     return request(server).get(`/home/folder/${id}`);
  //   };

  //   it('should return 400 if id is not provided', async () => {
  //     const res = await execute();

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 400 if id is empty', async () => {
  //     const res = await execute('');

  //     expect(res.status).toBe(404);
  //   });

  //   it('should return 400 if id is undefined', async () => {
  //     const res = await execute('undefined');

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 404 if id is not found', async () => {
  //     const res = await execute('909');

  //     expect(res.status).toBe(404);
  //   });

  //   it('should return 200 if request is valid', async () => {
  //     const id = '0';

  //     const res = await execute(id);

  //     expect(res.status).toBe(200);
  //   });

  //   // it('should match response data with DB function: findAllByid', async () => {
  //   //   const id = '2';

  //   //   const res = await execute(id);
  //   //   const file = Files.findAllByid(id);

  //   //   expect(res.body[0]).toEqual(file[0]);
  //   // });
  // });


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