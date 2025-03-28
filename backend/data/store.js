export const store = {
  cart: [],
  orders: [],
  discountCodes: [],
  usedCodes: new Set(),
  n: 3, // every nth order
  products: [
    { id: '1', name: 'Laptop', price: 1200, thumbnail: 'https://placehold.co/600x400/EEE/31343C?font=poppins&text=Laptop' },
    { id: '2', name: 'Phone', price: 800, thumbnail: 'https://placehold.co/600x400/EEE/31343C?font=poppins&text=Phone' },
    { id: '3', name: 'Headphones', price: 150, thumbnail: 'https://placehold.co/600x400/EEE/31343C?font=poppins&text=Headphones' },
    { id: '4', name: 'Keyboard', price: 100, thumbnail: 'https://placehold.co/600x400/EEE/31343C?font=poppins&text=Keyboard' },
    { id: '5', name: 'Mouse', price: 50, thumbnail: 'https://placehold.co/600x400/EEE/31343C?font=poppins&text=Mouse' },
    { id: '6', name: 'Monitor', price: 300, thumbnail: 'https://placehold.co/600x400/EEE/31343C?font=poppins&text=Monitor' },
    { id: '7', name: 'USB-C Charger', price: 40, thumbnail: 'https://placehold.co/600x400/EEE/31343C?font=poppins&text=USB-C+Charger' },
    { id: '8', name: 'Gaming Chair', price: 350, thumbnail: 'https://placehold.co/600x400/EEE/31343C?font=poppins&text=Gaming+Chair' },
    { id: '9', name: 'Webcam', price: 120, thumbnail: 'https://placehold.co/600x400/EEE/31343C?font=poppins&text=Webcam' },
    { id: '10', name: 'External Hard Drive', price: 200, thumbnail: 'https://placehold.co/600x400/EEE/31343C?font=poppins&text=External+Hard+Drive' },
  ]
};
