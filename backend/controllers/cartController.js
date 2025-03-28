import { store } from '../data/store.js';

// Get cart
export const getCart = (req, res) => {
  res.json(store.cart);
};


// Add item to cart
export const addItemToCart = (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Product ID and quantity are required' });
  }

  const product = store.products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const existingItem = store.cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    store.cart.push({
      productId,
      name: product.name,
      price: product.price,
      quantity,
    });
  }


  res.json({ message: 'Item added to cart', cart: store.cart });
};


// Delete item from cart
export const deleteItemFromCart = (req, res) => {
  const { productId } = req.params;
  const index = store.cart.findIndex(item => item.productId === productId);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  store.cart.splice(index, 1);

  res.json({ message: 'Item removed from cart', cart: store.cart });
};