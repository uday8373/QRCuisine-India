import React from "react";
import HeroV2 from "./Hero-V2";
import HelpsRestaurants from "./Helps-Restaurants";
import SmarterOrdering from "./Smarter-Ordering";
import ControlOrders from "./Control-Orders";
import Analytics from "./Analytics";
import Pricing from "./Pricing";
import Footer from "./footer";
import Header from "./Header";
import QrScan from "./Qr-Scan";

export default function HomeV2() {
  return (
    <>
      <main className="flex items-center flex-col justify-center w-full ">
        <HeroV2 />
        <QrScan />
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
