"use client";

import React from "react";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import Sad from "@/components/lottie/Cancel.json";
export default function CancelOrder() {
  return (
    <div className="w-full  ">
      <div
        className={`w-full flex flex-col items-center justify-center
         px-5 gap-4 pt-8 pb-5`}
      >
        <div>
          <LottieAnimation width={120} height={120} animationData={Sad} />
        </div>
        <h2 className=" text-center  font-bold text-2xl">
          Your order has been cancelled
        </h2>
      </div>
    </div>
  );
}
