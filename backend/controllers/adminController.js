import { store } from '../data/store.js';
import { v4 as uuidv4 } from 'uuid';

// Generate discount code
export const generateDiscountCode = (req, res) => {
  const orderCount = store.orders.length;

  // Check if there are unused codes
  const hasUnusedCode = store.discountCodes.some(code => code.used === false);
  console.log("store.discountCodes", store.discountCodes);
  console.log("hasUnusedCode", hasUnusedCode);
  if (hasUnusedCode) {
    return res.status(400).json({
      error: 'An unused discount code already exists. Please use it before generating a new one.',
    });
  }

  if ((orderCount + 1) % store.n !== 0) {
    return res.status(400).json({
      error: `Next discount code will be generated at order ${store.n - (orderCount % store.n)}`,
    });
  }

  const code = `DISCOUNT10-${uuidv4().slice(0, 6).toUpperCase()}`;

  store.discountCodes.push({
    code,
    used: false,
    discountAmount: 0,
  });

  res.json({ message: 'Discount code generated', code });
};


// Get store stats
export const getStats = (req, res) => {
  const totalItemsPurchased = store.orders.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
  }, 0);

  const totalPurchaseAmount = store.orders.reduce((sum, order) => sum + order.total, 0);
  const totalDiscountAmount = store.orders.reduce((sum, order) => sum + order.discount, 0);

  const formattedDiscountCodes = store.discountCodes.map(code => ({
    code: code?.code || 'N/A',
    used: code?.used ?? false,
    discountAmount: code?.discountAmount || 0,
  }));

  res.json({
    totalOrders: store.orders.length,
    totalRevenue: totalPurchaseAmount - totalDiscountAmount,
    totalPurchaseAmount,
    totalItemsPurchased,
    totalDiscountAmount,
    discountCodes: formattedDiscountCodes,
  });
};
