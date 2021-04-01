const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order.js');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });

  it('ASYNC/AWAIT: creates a new order in our database and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('ASYNC/AWAIT: gets all the orders', async () => {
    const order1 = await Order.insert({ quantity: 6 });
    const order2 = await Order.insert({ quantity: 4 });
    const res = await request(app)
      .get('/api/v1/orders')
    
    expect(res.body).toEqual([order1, order2]);
  });

  // it('get by id', async() => {
  //   const order = await Order.insert({ quantity: 10 });

  //   const res = await request(app)
  //     .get(`/api/v1/orders/${order.id}`);
  // })
  it('ASYNC/AWAIT: gets an order via id', async () => {
    const order1 = await Order.insert({ quantity: 6 });
    const res = await request(app)
      .get('/api/v1/orders/1');

    expect(res.body).toEqual(order1);
  });

  it('ASYNC/AWAIT: updates an order with new quantity via id', async () => {
    await Order.insert({ quantity: 4 });
    const res = await request(app)
      .put('/api/v1/orders/1')
      .send({ quantity: 14 })
      
    const updatedOrder = await request(app)
    .get('/api/v1/orders/1')

    expect(res.body).toEqual(updatedOrder.body);
  });

  it('ASYNC/AWAIT: deletes an order via id', async () => {
    const order1 = await Order.insert({ quantity: 6 });
    const res = await request(app)
      .delete('/api/v1/orders/1')
      

    expect(res.body).toEqual(order1);
  });

});
