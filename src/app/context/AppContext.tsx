import { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  size: string[];
  color: string[];
  image: string;
  rating: number;
  stock: number;
  storeId: number;
  storeName: string;
  distance: number;
  isOverstock?: boolean;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
  orderDate: Date;
  deliveryAddress: string;
  estimatedDelivery: string;
}

interface AppContextType {
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  addToCart: (product: Product, size: string, color: string, quantity: number) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateCartQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  placeOrder: (address: string) => string;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Product, size: string, color: string, quantity: number) => {
    setCart(prev => {
      const existingItem = prev.find(
        item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: number, size: string, color: string) => {
    setCart(prev => prev.filter(
      item => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)
    ));
  };

  const updateCartQuantity = (productId: number, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const placeOrder = (address: string): string => {
    const orderId = `ORD${Date.now()}`;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      total,
      status: 'placed',
      orderDate: new Date(),
      deliveryAddress: address,
      estimatedDelivery: '30-45 mins',
    };
    setOrders(prev => [newOrder, ...prev]);
    return orderId;
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        placeOrder,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

export type { Product, CartItem, Order };
