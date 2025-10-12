// ...existing code...
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  _id?: string;
  title: string;
  imageCover: string;
  price: number;
}

interface CartItem {
  _id?: string;
  product: Product;
  count: number;
  price?: number; // sometimes price may be on item
}

interface Order {
  _id?: string;
  id?: number | string;
  cartItems?: CartItem[];
  totalOrderPrice?: number;
  isPaid?: boolean;
  paymentMethodType?: string;
  createdAt?: string;
}

export default function MyOrders(): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/orders/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );
        // API returns array in res.data or res.data.data based on endpoint
        const dataFromApi: any[] = res.data?.data ?? res.data ?? [];
        setOrders(dataFromApi as Order[]);
        console.log(dataFromApi);
      } catch (err) {
        console.error(err);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📦 My Orders</h1>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-gray-600">No orders yet.</div>
        ) : (
          orders.map((order) => {
            const key =
              order._id ?? order.id ?? Math.random().toString(36).slice(2, 9);
            return (
              <div key={key} className="border p-4 rounded shadow bg-white">
                <h2 className="font-bold text-lg">
                  Order #{order.id ?? order._id}
                </h2>
                <p>Total: {order.totalOrderPrice ?? 0} EGP</p>
                <p>
                  Paid:{" "}
                  <span
                    className={order.isPaid ? "text-green-600" : "text-red-600"}
                  >
                    {order.isPaid ? "✅ Paid" : "❌ Not Paid"}
                  </span>
                </p>
                <p>Payment Method: {order.paymentMethodType ?? "—"}</p>

                <div className="mt-2 space-y-2">
                  {Array.isArray(order.cartItems) &&
                  order.cartItems.length > 0 ? (
                    order.cartItems.map((item) => {
                      const itemKey =
                        item._id ??
                        item.product?._id ??
                        Math.random().toString(36).slice(2, 9);
                      const itemPrice = item.price ?? item.product?.price ?? 0;
                      return (
                        <div
                          key={itemKey}
                          className="text-sm flex gap-2 items-center"
                        >
                          <img
                            src={item.product?.imageCover ?? ""}
                            alt={item.product?.title ?? "product"}
                            className="w-10 h-10 rounded object-contain"
                          />
                          <span>
                            {item.product?.title ?? "Product"} - {item.count} ×{" "}
                            {itemPrice} EGP
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-sm text-gray-500">
                      No items in this order.
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
// ...existing code...
