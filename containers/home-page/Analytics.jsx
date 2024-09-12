import { Analytics1, Analytics2 } from "@/public/assets/svg/Home-Page/Index";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export default function Analytics() {
  return (
    <section
      id="ControlOrders"
      className="flex items-center flex-col justify-center w-full  bg-primary-100  "
    >
      <div className=" w-full h-full space-y-5 relative  max-w-screen-xl px-6 py-8 md:py-16 z-10">
        <div>
          <h3 className="text-secondary font-medium text-3xl">{`Real-Time Analytics, Real-Time `}</h3>
          <p className="text-secondary font-bold text-5xl">Success</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full relative overflow-hidden items-center ">
          <Image
            className=" w-full p-10 h-full "
            src={Analytics2}
            alt="Analytics"
            width={0}
            height={0}
          />
          <Image
            className="w-full  h-full"
            src={Analytics1}
            alt="Analytics"
            width={0}
            height={0}
          />
        </div>
        <div className="pt-5 w-full justify-center items-center flex">
          <Button
            size="lg"
            variant="solid"
            color="primary"
            radius="sm"
            className={`text-small px-16 font-semibold shadow-sm `}
          >
            Book Free Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
