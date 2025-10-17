import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../../Context/CartContext";


interface CheckoutValues {
  details: string;
  phone: string;
  city: string;
}


type CartContextType = {
  cartId?: string;
  CartCheckout?: (
    cartId: string | number,
    url: string,
    formData: Record<string, unknown>
  ) => Promise<AxiosResponse<unknown>>;
};

export default function Checkout(): React.ReactElement {
  
  const { cartId, CartCheckout } = useContext(CartContext) as CartContextType;

  const [loading, setLoading] = useState<boolean>(false);

  
  const validationSchema = Yup.object().shape({
    details: Yup.string().required("Details is required"),
    phone: Yup.string().required("Phone is required"),
    city: Yup.string().required("City is required"),
  });

 
  const formik = useFormik<CheckoutValues>({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: (values) =>
      handleCheckout(cartId ?? "", window.location.origin, values),
  });

  
  async function handleCheckout(
    cartIdParam: string | number,
    url: string,
    values: CheckoutValues
  ): Promise<void> {
    if (!cartIdParam) {
      console.error("No cartId provided");
      return;
    }

    if (typeof CartCheckout !== "function") {
      console.error("CartCheckout is not available");
      return;
    }

    setLoading(true);
    try {
      const res = await CartCheckout(cartIdParam, url, values);
      const redirectUrl = (res?.data as any)?.session?.url;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.log("Checkout response:", res);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto px-5 py-12">
      {/* Details Input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          name="details"
          id="details"
          value={formik.values.details}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 peer"
          placeholder=" "
        />
        <label
          htmlFor="details"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10"
        >
          Details
        </label>
        {formik.touched.details && formik.errors.details && (
          <span className="text-red-500 text-xs">{formik.errors.details}</span>
        )}
      </div>

      {/* Phone Input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="tel"
          name="phone"
          id="phone"
          value={formik.values.phone}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 peer"
          placeholder=" "
        />
        <label
          htmlFor="phone"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10"
        >
          Phone
        </label>
        {formik.touched.phone && formik.errors.phone && (
          <span className="text-red-500 text-xs">{formik.errors.phone}</span>
        )}
      </div>

      {/* City Input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          name="city"
          id="city"
          value={formik.values.city}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 peer"
          placeholder=" "
        />
        <label
          htmlFor="city"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10"
        >
          City
        </label>
        {formik.touched.city && formik.errors.city && (
          <span className="text-red-500 text-xs">{formik.errors.city}</span>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="cursor-pointer text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center"
          disabled={loading}
        >
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"}
        </button>
      </div>
    </form>
  );
}
