import React from "react";
import HelpsRestaurants from "./Helps-Restaurants";
import SmarterOrdering from "./Smarter-Ordering";
import ControlOrders from "./Control-Orders";
import Analytics from "./Analytics";
import Pricing from "./Pricing";
import Footer from "./footer";
import QrScan from "./Qr-Scan";
import Hero from "./Hero";

export default function HomePage() {
  return (
    <>
      <main className="flex items-center flex-col justify-center w-full ">
        <Hero />
        <HelpsRestaurants />
        <SmarterOrdering />
        <ControlOrders />
        <Analytics />
        <Pricing />
        <Footer />
      </main>
    </>
  );
}
