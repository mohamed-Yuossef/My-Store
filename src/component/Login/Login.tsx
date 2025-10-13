import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios, { type AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

interface LoginValues {
  email: string;
  password: string;
}

interface UserContextType {
  userLogin?: boolean;
  setUserLogin?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login(): React.ReactElement {
  const ctx = useContext(UserContext) as UserContextType | null;
  const setUserLogin = ctx?.setUserLogin;
  const [apiError, setApiError] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleRegister(values: LoginValues): Promise<void> {
    setApiError("");
    try {
      setLoading(true);
      const res: AxiosResponse<{ token?: string }> = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      const token = res.data?.token;
      if (!token) {
        throw new Error("No token returned from server");
      }
      localStorage.setItem("token", token);
      if (typeof setUserLogin === "function") setUserLogin(true);
      toast.success("Logged in");
      navigate("/");
    } catch (err: unknown) {
      // handle axios error and generic error
      const message =
        axios.isAxiosError(err) && err.response?.data
          ? err.response.data.message ?? JSON.stringify(err.response.data)
          : (err as Error).message ?? "An error occurred";
      toast.error(message);
      setApiError(message);
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto ">
        <div className="flex flex-col justify-center items-center ">
          <div className="relative z-0  w-[80%] md:w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10"
            >
              Email
            </label>
            {formik.touched.email && formik.errors.email ? (
              <span className="text-red-500">{formik.errors.email}</span>
            ) : null}
          </div>

          <div className="relative z-0  w-[80%] md:w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10"
            >
              Password
            </label>
            {formik.touched.password && formik.errors.password ? (
              <span className="text-red-500">{formik.errors.password}</span>
            ) : null}
          </div>
        </div>

        {apiError && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {apiError}
          </div>
        )}

        <div className="flex justify-center items-center">
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-[50%] md:w-full px-7 py-2.5 text-center disabled:opacity-60"
          >
            {loading ? (
              <FontAwesomeIcon className="fa-pulse" icon={faSpinner} />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
