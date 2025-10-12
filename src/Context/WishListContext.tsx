import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ErrorBoundary from "../component/ErrorBoundary/ErrorBoundary";

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishlistCount, setWishlistCount] = useState(0);
  const token = localStorage.getItem("token");
  function AddWishList(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.length);
        setWishlistCount(res.data.data.length);
        return res;
      })
      .catch((error) => error);
  }
  function AllWishListItem() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        // console.log(res.data.data.length);
        setWishlistCount(res.data.data.length);
        return res;
      })
      .catch((error) => error);
  }
  function RemoveWishlist(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        // console.log(res.data.data.length);
        setWishlistCount(res.data.data.length);
        return res;
      })
      .catch((error) => error);
  }
  useEffect(() => {
    AllWishListItem();
  }, []);
  return (
    <>
      <ErrorBoundary>
        <WishListContext.Provider
          value={{
            AddWishList,
            wishlistCount,
            setWishlistCount,
            AllWishListItem,
            RemoveWishlist,
          }}
        >
          {children}
        </WishListContext.Provider>
      </ErrorBoundary>
    </>
  );
}
