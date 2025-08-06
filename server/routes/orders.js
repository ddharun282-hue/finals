const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const { customerInfo, shippingAddress, billingAddress, product, paymentMethod } = req.body;
    
    // Validate product
    const productDoc = await Product.findById(product.id);
    if (!productDoc || !productDoc.inStock) {
      return res.status(400).json({ 
        message: `Product ${productDoc ? productDoc.name : 'with given ID'} is not available` 
      });
    }
    
    const totalAmount = productDoc.price * product.quantity;
    
    const order = new Order({
      customerInfo,
      shippingAddress,
      billingAddress,
      product: {
        productId: productDoc._id,
        productName: productDoc.name,
        quantity: product.quantity,
        price: productDoc.price,
        size: product.size
      },
      totalAmount,
      paymentMethod,
      // Legacy fields for backward compatibility
      customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: {
        street: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode
      },
      items: [{
        productId: productDoc._id,
        productName: productDoc.name,
        quantity: product.quantity,
        price: productDoc.price
      }]
    });
    
    await order.save();
    await order.populate('product.productId');
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
});

// Get all orders (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    
    const orders = await Order.find(filter)
      .populate('items.productId')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
      
    const total = await Order.countDocuments(filter);
    
    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single order (admin only)
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status, trackingId, notes } = req.body;
    
    const updateData = { status };
    if (trackingId) updateData.trackingId = trackingId;
    if (notes) updateData.notes = notes;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error: error.message });
  }
});

// Get order statistics (admin only)
router.get('/stats/overview', adminAuth, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const shippedOrders = await Order.countDocuments({ status: 'shipped' });
    const deliveredOrders = await Order.countDocuments({ status: 'delivered' });
    
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $in: ['shipped', 'delivered'] } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    
    res.json({
      totalOrders,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;