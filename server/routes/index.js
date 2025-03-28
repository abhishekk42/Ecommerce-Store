import express from 'express';
import { addItemToCart, deleteItemFromCart, getCart } from '../controllers/cartController.js';
import { checkout } from '../controllers/checkoutController.js';
import { generateDiscountCode, getStats } from '../controllers/adminController.js';
import { getAllProducts } from '../controllers/productController.js';

const router = express.Router();

// Product Routes
router.get('/products', getAllProducts);

// Cart Routes
router.post('/cart', addItemToCart);
router.get('/cart', getCart);
router.delete('/cart/:productId', deleteItemFromCart);

// Checkout
router.post('/checkout', checkout);

// Admin
router.post('/admin/generate-discount', generateDiscountCode);
router.get('/admin/stats', getStats);

export default router;
