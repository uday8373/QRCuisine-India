import React from "react";
import CancelOrder from "./Cancel-Order";
import OrderDetails from "./Order-Details";
import Reason from "./Reason";
import Footer from "./Footer";

export default function CancelMain() {
  return (
    <section
      id="complete"
      className="w-full h-svh flex bg-background  items-center  flex-col "
    >
      <CancelOrder />
      <OrderDetails />
      <Reason />
      <Footer />
    </section>
  );
}
