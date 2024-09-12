import {
  Analytics1,
  Analytics2,
  Hand,
} from "@/public/assets/svg/Home-Page/Index";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export default function Pricing() {
  return (
    <section
      id="Pricing"
      className="flex items-center flex-col justify-center w-full    "
    >
      <div className=" w-full h-full space-y-5 relative  max-w-screen-xl px-6 py-8 md:py-16 z-10">
        <div className="max-w-lg space-y-3">
          <h3 className="text-secondary font-medium text-2xl md:text-3xl">
            Simple Pricing for Smart Dining
          </h3>
          <p className=" font-normal  text-pretty text-base">
            QRcuisine provides restaurants real-time data of operations, It will
            make all transactions transparent to owner and manager.{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 pt-5 w-full relative overflow-hidden items-center ">
          <div className="bg-primary-200 py-8 px-10 rounded-xl flex justify-center  gap-5 flex-col">
            <h3 className=" font-bold text-3xl  ">
              Free for the first <br />3 Months
            </h3>
            <p className="text-lg text-black ">
              Try it with no loose. We are confident on our product and we will
              make you do so.
            </p>
            <h4 className="text-lg text-black font-semibold ">
              Explore our awesome tools and services without paying.
            </h4>
            <div className="pt-5 w-full justify-center items-center flex">
              <Button
                size="lg"
                variant="solid"
                color="primary"
                fullWidth
                radius="sm"
                className={`text-small px-10  font-semibold shadow-sm `}
              >
                REGISTER NOW
              </Button>
            </div>
          </div>
          <div className="bg-primary-200 lg:col-span-2 h-full rounded-xl py-8 px-10 flex justify-center items-start gap-5 flex-col">
            <Image
              className=" w-20 h-20 "
              src={Hand}
              alt="Hand"
              width={0}
              height={0}
            />

            <h3 className="font-bold text-4xl  ">
              We cost less then a waiter <br />
              <p className="text-xl leading-snug text-black font-semibold ">
                and serve more then a manager, analyst and <br />
                marketer.
              </p>
            </h3>

            <div className="pt-5 w-full justify-center flex-col  gap-2 flex">
              <h3 className="text-primary font-semibold text-lg">
                Monthly subscription
              </h3>
              <p className="text-primary font-semibold text-3xl">
                Rs. 3999 / Month
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
