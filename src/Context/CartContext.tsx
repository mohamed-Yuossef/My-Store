import axios, { type AxiosResponse } from "axios";
import React, { createContext, useEffect, useState } from "react";

interface ProductMinimal {
  _id: string;
  imageCover: string;
  title: string;
  price?: number;
}

interface CartItem {
  _id?: string;
  product: ProductMinimal;
  count: number;
  price?: number;
}

interface CartApiData {
  products?: CartItem[];
  _id?: string;
  numOfCartItems?: number;
  totalCartPrice?: number;
  [key: string]: unknown;
}

interface OrderApi {
  _id?: string;
  id?: number | string;
  cartItems?: CartItem[];
  totalOrderPrice?: number;
  isPaid?: boolean;
  paymentMethodType?: string;
  createdAt?: string;
  [key: string]: unknown;
}

type ApiWrapper<T> = { data: T };

export type CartContextType = {
  AddToCart: (id: string) => Promise<AxiosResponse<ApiWrapper<CartApiData>>>;
  AllCart: () => Promise<AxiosResponse<ApiWrapper<CartApiData>>>;
  UpDateProduct: (
    id: string,
    count: number
  ) => Promise<AxiosResponse<ApiWrapper<CartApiData>>>;
  RemoveCart: (id: string) => Promise<AxiosResponse<ApiWrapper<CartApiData>>>;
  CartCheckout: (
    cartId: string | number,
    url: string,
    formData: Record<string, unknown>
  ) => Promise<AxiosResponse<unknown>>;
  ClearCart: () => Promise<AxiosResponse<ApiWrapper<null>>>;
  fetchOrders: () => Promise<AxiosResponse<ApiWrapper<OrderApi[]>>>;
  numberItem: number;
  setNumberItem: React.Dispatch<React.SetStateAction<number>>;
  cartId: string | number | null;
};

export const CartContext = createContext<CartContextType | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [orders, setOrders] = useState<OrderApi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [numberItem, setNumberItem] = useState<number>(0);
  const [cartId, setCartId] = useState<string | number | null>(null);

  // ✅ Token Getter
  const getToken = (): string => localStorage.getItem("token") || "";

  // ✅ Get All Cart
  async function AllCart(): Promise<AxiosResponse<ApiWrapper<CartApiData>>> {
    const token = getToken();
    const res = await axios.get<ApiWrapper<CartApiData>>(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers: { token } }
    );

    const payload =
      (res.data as unknown as { data?: CartApiData }).data ??
      (res.data as unknown as CartApiData);

    setCartId(payload?._id ?? null);
    setNumberItem(payload?.numOfCartItems ?? 0);

    return res;
  }

  // ✅ Add Product to Cart
  async function AddToCart(
    id: string
  ): Promise<AxiosResponse<ApiWrapper<CartApiData>>> {
    const token = getToken();
    const res = await axios.post<ApiWrapper<CartApiData>>(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: id },
      { headers: { token } }
    );
    return res;
  }

  // ✅ Remove Product from Cart
  async function RemoveCart(
    id: string
  ): Promise<AxiosResponse<ApiWrapper<CartApiData>>> {
    const token = getToken();
    const res = await axios.delete<ApiWrapper<CartApiData>>(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { headers: { token } }
    );
    return res;
  }

  // ✅ Update Product Quantity
  async function UpDateProduct(
    id: string,
    count: number
  ): Promise<AxiosResponse<ApiWrapper<CartApiData>>> {
    const token = getToken();
    const res = await axios.put<ApiWrapper<CartApiData>>(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count },
      { headers: { token } }
    );
    return res;
  }

  // ✅ Checkout
  async function CartCheckout(
    cartIdParam: string | number,
    url: string,
    formData: Record<string, unknown>
  ): Promise<AxiosResponse<unknown>> {
    const token = getToken();
    const res = await axios.post<unknown>(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartIdParam}?url=${encodeURIComponent(
        url
      )}`,
      { shippingAddress: formData },
      { headers: { token } }
    );
    return res;
  }

  // ✅ Fetch Orders
  async function fetchOrders(): Promise<AxiosResponse<ApiWrapper<OrderApi[]>>> {
    const token = getToken();
    const res = await axios.get<ApiWrapper<OrderApi[]>>(
      "https://ecommerce.routemisr.com/api/v1/orders/user/",
      { headers: { token } }
    );

    const data = (res.data as unknown as { data?: OrderApi[] }).data ?? [];
    setOrders(data);

    return res;
  }

  // ✅ Clear Cart
  async function ClearCart(): Promise<AxiosResponse<ApiWrapper<null>>> {
    const token = getToken();
    const res = await axios.delete<ApiWrapper<null>>(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers: { token } }
    );
    setNumberItem(0);
    return res;
  }

  // ✅ Initial Load
  useEffect(() => {
    AllCart()
      .catch(() => {
        console.warn("Failed to load cart on mount");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: CartContextType = {
    AddToCart,
    AllCart,
    UpDateProduct,
    RemoveCart,
    CartCheckout,
    ClearCart,
    fetchOrders,
    numberItem,
    setNumberItem,
    cartId,
  };

  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  );
}
