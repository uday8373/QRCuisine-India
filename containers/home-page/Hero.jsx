import React from "react";
import { Button } from "@nextui-org/react";

export default function Hero() {
  return (
    <>
      <section
        id="homepage"
        className="flex items-center justify-center w-full   bg-gradient-to-t from-secondary-50  to-primary-100  "
      >
        <div className=" w-full h-full   grid grid-cols-1    max-w-screen-xl py-8 md:py-20 px-6 z-10">
          <div className="flex items-center relative justify-center  flex-col gap-8  md:gap-10 text-center ">
            <div className="w-44 h-44 blur-lg  bg-secondary-200 rounded-full absolute top-20 -z-10"></div>
            <div className="w-40 h-40 blur-lg bg-primary-200 rounded-full absolute -translate-x-16 right-1/2 top-24 -z-20"></div>

            <h3 className="underline-offset-4 underline ">{`FOR FULL SERVICE RESTAURANT’S `}</h3>
            <div className="space-y-5">
              <p className=" text-3xl md:text-4xl font-bold font-Rethink  text-balance text-black">
                We ensure{` restaurant's `}
                <br />
                sustainability & Growth
              </p>

              <div className="flex w-full justify-center items-center z-20">
                <div className="w-20 border-t-2 border-gray-500"></div>

                <div className="min-w-fit mx-5">
                  <h4 className="font-bold">
                    With futuristic <br />
                    technology
                  </h4>
                </div>
                <div className="w-20 border-t-2 border-gray-500"></div>
              </div>
            </div>
            <p className="text-balance max-w-lg">
              QRCuisine helps restaurants save costs, gain real-time analytics,
              and boost efficiency with smart technology
            </p>
            <div className="space-y-2">
              <Button
                size="lg"
                variant="solid"
                color="primary"
                radius="sm"
                className={`text-small px-10  font-semibold shadow-sm `}
              >
                Try free for 3 months
              </Button>
              <p className="text-xs font-bold font-Rethink text-black">{`Trusted by 100’s of restaurants`}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
