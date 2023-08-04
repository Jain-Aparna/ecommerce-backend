const Order = require('../model/Order');
const { findByIdAndDelete } = require('../model/Product');


exports.fetchOrderByUser = async (req, res) => {
    const {id} = req.user;
    try {
      const orders = await Order.find({user:id});
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    for(let item of order.items){
      let product =  await Product.findOne({_id:item.product.id})
      product.$inc('stock',-1*item.quantity);
      // for optimum performance we should make inventory outside of product.
      await product.save()
   }
    try {
      const doc = await order.save();
      const user = await User.findById(order.user)
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  exports.deleteOrder = async (req, res) => {
    const {id} =req.params;
    try {
      const order = await Order.findByIdAndDelete(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  exports.updateOrder = async(req, res)=>{
    const {id} =req.params;
    try{
        const order = await Order.findByIdAndUpdate(id, req.body, {new: true})
        res.status(201).json(order)
      }catch(err){
        res.status(400).json(err);
      }
    
};

exports.fetchAllOrders =async (req, res) => {
    let query = Order.find({deleted:{$ne:true}});
    let totalOrdersQuery=Order.find({deleted:{$ne:true}});
 
    if(req.query._sort && req.query._order){
        query= query.sort({[req.query._sort]:req.query._order})
        
    }

    const totalDocs = await totalOrdersQuery.count().exec();
    console.log({totalDocs});

    if(req.query._page && req.query._limit){
        const pageSize=req.query._limit;
        const page = req.query._page;
        query= query.skip(pageSize*(page-1)).limit(pageSize);
    }
    try{
      const doc= await query.exec();
      res.set('X-Total-Count', totalDocs);
      res.status(201).json(doc)
    }catch(err){
      res.status(400).json(err);
    }
  };