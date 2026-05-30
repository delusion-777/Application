import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Products } from "./components/Products";
import { ProductDetail } from "./components/ProductDetail";
import { Cart } from "./components/Cart";
import { Wishlist } from "./components/Wishlist";
import { Orders } from "./components/Orders";
import { OrderTracking } from "./components/OrderTracking";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "wishlist", Component: Wishlist },
      { path: "orders", Component: Orders },
      { path: "orders/:id", Component: OrderTracking },
    ],
  },
]);
