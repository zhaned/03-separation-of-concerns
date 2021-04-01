const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    // OrderService
    //   .create(req.body)
    //   .then(order => res.send(order))
    //   .catch(next);
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const order = await OrderService.getAllOrders();
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const [order] = await OrderService.getOrders(req.params.id);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    OrderService
      .updateOrder(req.params.id, req.body.quantity)
      .then(([order]) => res.send(order))
      .catch(next);
  })
  .delete('/:id', async (req, res, next) => {
    OrderService
      .deleteOrder(req.params.id)
      .then(order => res.send(order))
      .catch(next);
  });
