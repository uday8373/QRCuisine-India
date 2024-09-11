import { HelpsRestaurantsData } from "@/constant/data";
import { Dashboard } from "@/public/assets/svg/Home-Page/Index";
import Image from "next/image";
import React from "react";

export default function HelpsRestaurants() {
  return (
    <>
      <section
        id="HelpsRestaurants"
        className="flex items-center flex-col justify-center w-full  "
      >
        <div className=" w-full h-full grid grid-cols-1 lg:grid-cols-2   max-w-screen-xl py-8 md:py-16 px-6  z-10">
          <div className="lg:col-span-2 max-w-lg py-2">
            <h2 className="text-secondary font-medium text-2xl md:text-4xl">{`QRCuisine Helps Restaurant’s to manage efficiently`}</h2>
          </div>
          <div className="lg:max-w-lg">
            <div className="flex flex-col md:gap-10 gap-6 py-5 md:py-10">
              {HelpsRestaurantsData.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex  gap-5 items-start">
                      <div>
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={0}
                          height={0}
                          className=" w-24 md:w-full h-full pt-2 lg:w-24 object-contain"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold  text-[#010101] text-xl md:text-2xl font-Rethink">
                          {item.title}
                        </h3>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end items-center w-full h-full">
            <Image
              src={Dashboard}
              alt="dashboard"
              width={0}
              height={0}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
}
