import { CircleElement } from "@/components/icons/icons";
import Safari from "@/components/mockup/safari-mockup";
import { HelpsRestaurantsData } from "@/constant/data";
import { Dashboard } from "@/public/assets/svg/Home-Page/Index";
import { HandPlatter } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function HelpsRestaurants() {
  return (
    <>
      <section
        id="HelpsRestaurants"
        className="flex items-center flex-col justify-center w-full overflow-hidden"
      >
        <div className=" w-full h-full grid grid-cols-1 lg:grid-cols-2 max-w-screen-xl py-8 md:py-16 px-6 z-10">
          <div className="lg:col-span-2 max-w-lg py-2">
            <h2 className="text-secondary font-bold md:leading-tight text-2xl md:text-[38px]">{`QRCuisine Helps Restaurant’s to manage efficiently`}</h2>
          </div>
          <div className="lg:max-w-lg">
            <div className="flex flex-col md:gap-10 gap-6 py-5 md:py-10">
              {HelpsRestaurantsData.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex gap-5 items-start  ">
                      <div>
                        <div className="p-4 bg-primary-500/20 rounded-lg mt-2">
                          <item.icon size={30} className="text-primary-500" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-default-800 text-xl md:text-2xl font-Rethink">
                          {item.title}
                        </h3>
                        <p className="text-md text-default-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center w-full h-full relative justify-center ">
            <Safari
              src="/mockup/mockup1.png"
              url="business.qrcuisine.com"
              className="size-full z-[5]"
            />
            <CircleElement
              size={350}
              className="fill-secondary-300 absolute -top-20 lg:flex hidden"
            />
          </div>
        </div>
      </section>
    </>
  );
}
