import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes";
import { Toaster } from './components/ui/sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <AppRoutes />
      <Toaster />
    </CartProvider>
  </StrictMode>,
)
