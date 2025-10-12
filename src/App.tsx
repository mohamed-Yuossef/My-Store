import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayOut from "./component/LayOut/LayOut";
import Home from "./component/Home/Home";
import Shop from "./component/Shop/Shop";
import Products from "./component/Products/Products";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import Login from "./component/Login/Login";

import WishList from "./component/WishList/WishList";
import Cart from "./component/Cart/Cart";
import { UserProvider } from "./Context/UserContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import CartContextProvider from "./Context/CartContext";
import WishListContextProvider from "./Context/WishListContext";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary";
import Checkout from "./component/Checkout/Checkout";
import Allorders from "./component/Allorders/Allorders";

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  const Rout = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              {" "}
              <Products />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/productDetails/:id/:category",
          element: (
            <ProtectedRoute>
              {" "}
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        
        {
          path: "shop",
          element: (
            <ProtectedRoute>
              {" "}
              <Shop />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              {" "}
              <Checkout />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              {" "}
              <Allorders />{" "}
            </ProtectedRoute>
          ),
        },
      
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              {" "}
              <WishList />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              {" "}
              <Cart />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <UserProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <ErrorBoundary>
              <RouterProvider router={Rout}></RouterProvider>
            </ErrorBoundary>
          </WishListContextProvider>
          <Toaster />
        </CartContextProvider>
      </UserProvider>
    </>
  );
}
