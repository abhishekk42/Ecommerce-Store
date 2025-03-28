import { store } from '../data/store.js';

// Checkout
export const checkout = (req, res) => {
  const { discountCode } = req.body;
  if (store.cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const total = store.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let finalAmount = total;
  let discountApplied = 0;

  if (discountCode) {

    const codeIndex = store.discountCodes.findIndex(c => c.code === discountCode && !c.used);

    if (codeIndex === -1) {
      return res.status(400).json({ error: 'Invalid or already used discount code' });
    }    
    
    // Apply 10% discount
    discountApplied = total * 0.1;
    finalAmount = total - discountApplied;

    store.discountCodes[codeIndex].used = true;
    store.discountCodes[codeIndex].discountAmount = discountApplied;
    store.usedCodes.add(discountCode);
  }

  // Record the order
  store.orders.push({
    items: [...store.cart],
    total,
    discount: discountApplied,
    finalAmount,
    timestamp: new Date(),
  });

  // Clear cart
  store.cart = [];

  res.json({
    message: 'Order placed successfully',
    total,
    discountApplied,
    finalAmount,
  });
};
