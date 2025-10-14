import { createContext, useEffect, useState } from "react";
import axios from "axios";

interface CartApiData {
  numOfCartItems: number;
  data?: {
    _id: string;
    cartItems: any[];
    totalCartPrice: number;
  };
}

// interface CheckoutValues {
//   shippingAddress: {
//     details: string;
//     phone: string;
//     city: string;
//   };
// }

type CartContextType = {
  cartId?: string;
  numberItem: number;
  setNumberItem: React.Dispatch<React.SetStateAction<number>>;
  AllCart: () => Promise<AxiosResponse<any>>;
  AddToCart: (productId: string) => Promise<AxiosResponse<any>>;
  removeItem: (productId: string) => Promise<AxiosResponse<any>>;
  updateItem: (productId: string, count: number) => Promise<AxiosResponse<any>>;
  clearCart: () => Promise<AxiosResponse<any>>;
  CartCheckout: (
    cartId: string | number,
    url: string,
    formData: Record<string, unknown>
  ) => Promise<AxiosResponse<unknown>>;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartId, setCartId] = useState<string>("");
  const [numberItem, setNumberItem] = useState<number>(() => {
    const savedCount = localStorage.getItem("cartCount");
    return savedCount ? JSON.parse(savedCount) : 0;
  });

  
  useEffect(() => {
    localStorage.setItem("cartCount", JSON.stringify(numberItem));
  }, [numberItem]);

  const getToken = () => localStorage.getItem("token");

  // ✅ AllCart
  async function AllCart() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token: getToken() },
    });
  }

  // ✅ AddToCart
  async function AddToCart(productId: string) {
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      { headers: { token: getToken() } }
    );
    setNumberItem(res.data.numOfCartItems);
    return res;
  }

  // ✅ removeItem
  async function removeItem(productId: string) {
    const res = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { headers: { token: getToken() } }
    );
    setNumberItem(res.data.numOfCartItems);
    return res;
  }

  // ✅ updateItem
  async function updateItem(productId: string, count: number) {
    const res = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers: { token: getToken() } }
    );
    setNumberItem(res.data.numOfCartItems);
    return res;
  }

  // ✅ clearCart
  async function clearCart() {
    const res = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: { token: getToken() },
      }
    );
    setNumberItem(0);
    return res;
  }

  // ✅ CartCheckout
  async function CartCheckout(
    cartId: string | number,
    url: string,
    formData: Record<string, unknown>
  ) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      formData,
      { headers: { token: getToken() } }
    );
  }

  // ✅ أول ما المشروع يفتح أو token يتغير
  useEffect(() => {
    const token = getToken();
    if (token) {
      AllCart()
        .then((res) => {
          const num = (res.data as unknown as CartApiData).numOfCartItems ?? 0;
          setNumberItem(num);
          setCartId((res.data as any).data._id);
        })
        .catch(() => setNumberItem(0));
    }
  }, [localStorage.getItem("token")]);

  return (
    <CartContext.Provider
      value={{
        cartId,
        numberItem,
        setNumberItem,
        AllCart,
        AddToCart,
        removeItem,
        updateItem,
        clearCart,
        CartCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
