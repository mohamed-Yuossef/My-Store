import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleRegister(values) {
    setApiError("");
    try {
      setLoading(true);

      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log(res.data.token);
      setUserLogin(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
  const formik = useFormik({
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
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <span className="text-red-500">{formik.errors.email}</span>
          ) : null}
        </div>
        <div className="relative z-0  w-[80%] md:w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <>
              <span className="text-red-500">{formik.errors.password}</span>
            </>
          ) : null}
        </div>
      </div>
        {apiError && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {apiError} "This is the correct data. username: "mor_2314",
            password: "83r5^_""
          </div>
        )}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="cursor-pointer  text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-cyan-800 font-medium rounded-lg text-sm w-[50%] md:w-full sm:w-auto px-7 py-2.5  text-center "
          >
            {loading ? (
              <span>
                <FontAwesomeIcon
                  className="span fa-pulse"
                  icon={faSpinner}
                ></FontAwesomeIcon>
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
