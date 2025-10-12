import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function LayOut() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="my-20 py-6 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
