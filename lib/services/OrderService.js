const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async create({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert({ quantity });

    return order;
  }

  static async getAllOrders(){
    const orders = await Order.getAll();

    return orders;
  }

  static async getOrders(id){
    const orders = await Order.getOrder(id);

    return orders;
  }

  static async updateOrder(id, quantity){
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `The order was updated to ${quantity}.`
    );
    const orders = await Order.updateOrder(id, quantity);
    
    return orders;
  }

  static async deleteOrder(id){
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      'The order was deleted.'
    );
    const orders = await Order.deleteOrder(id);
    
    return orders;
  }
};
