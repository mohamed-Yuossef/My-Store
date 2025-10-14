import React, { createContext, useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import ErrorBoundary from "../component/ErrorBoundary/ErrorBoundary";

interface WishListItem {
  id?: string;
  productId?: string;
  [key: string]: unknown;
}

export type WishListContextType = {
  AddWishList: (id: string) => Promise<AxiosResponse<{ data: WishListItem[] }>>;
  AllWishListItem: () => Promise<AxiosResponse<{ data: WishListItem[] }>>;
  RemoveWishlist: (
    id: string
  ) => Promise<AxiosResponse<{ data: WishListItem[] }>>;
  wishlistCount: number;
  setWishlistCount: React.Dispatch<React.SetStateAction<number>>;
};

export const WishListContext = createContext<WishListContextType | null>(null);

export default function WishListContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  async function AddWishList(
    id: string
  ): Promise<AxiosResponse<{ data: WishListItem[] }>> {
    const token = localStorage.getItem("token") || "";
    const res = await axios.post<{ data: WishListItem[] }>(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: id },
      { headers: { token } }
    );
    setWishlistCount(res.data?.data?.length ?? 0);
    return res;
  }

  async function AllWishListItem(): Promise<
    AxiosResponse<{ data: WishListItem[] }>
  > {
    const token = localStorage.getItem("token") || "";
    const res = await axios.get<{ data: WishListItem[] }>(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: { token },
      }
    );
    setWishlistCount(res.data?.data?.length ?? 0);
    return res;
  }

  async function RemoveWishlist(
    id: string
  ): Promise<AxiosResponse<{ data: WishListItem[] }>> {
    const token = localStorage.getItem("token") || "";
    const res = await axios.delete<{ data: WishListItem[] }>(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: { token },
      }
    );
    setWishlistCount(res.data?.data?.length ?? 0);
    return res;
  }

  useEffect(() => {
    AllWishListItem().catch(() => {});
  }, []);

  const value: WishListContextType = {
    AddWishList,
    wishlistCount,
    setWishlistCount,
    AllWishListItem,
    RemoveWishlist,
  };

  return (
    <ErrorBoundary>
      <WishListContext.Provider value={value}>
        {children}
      </WishListContext.Provider>
    </ErrorBoundary>
  );
}
