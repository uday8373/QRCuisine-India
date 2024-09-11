import { Laptop, Laptop1, Laptop2 } from "@/public/assets/svg/Home-Page/Index";
import Image from "next/image";
import React from "react";

export default function ControlOrders() {
  return (
    <>
      <section
        id="ControlOrders"
        className="flex items-center flex-col justify-center w-full   "
      >
        <div className=" w-full h-full space-y-5 relative  max-w-screen-xl px-6  md:py-16 py-8 z-10">
          <div className="max-w-lg space-y-5 ">
            <h3 className="text-secondary font-medium text-2xl md:text-4xl">
              Control Orders, Manage Tables <br /> – All in One Solution
            </h3>
            <p className=" font-medium font-Rethink">
              Easily manage orders and tables from a single platform, ensuring
              smooth service, better organization, and a seamless dining
              experience for both staff and customers.
            </p>
          </div>

          <div className="flex w-full z-20 py-5 overflow-hidden">
            <Image
              width={0}
              height={0}
              alt="Laptop"
              src={Laptop}
              className="w-full h-full "
            />
          </div>
        </div>
      </section>
    </>
  );
}
