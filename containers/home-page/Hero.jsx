import React from "react";
import { Button } from "@nextui-org/react";
import QrScan from "./Qr-Scan";
import Image from "next/image";
import { RectangleElement } from "@/components/icons/icons";
import { MoveRight } from "lucide-react";

export default function Hero() {
  return (
    <>
      <section
        id="Hero"
        className="flex overflow-hidden flex-col items-center justify-center w-full h-auto bg-gradient-to-b from-primary-100 via-primary-50 to-secondary-50 relative"
      >
        <div className="w-full h-full backdrop-blur-xl absolute z-[10]" />
        <div className="absolute flex z-[5] justify-center w-full  items-center -mt-44">
          <div className="w-56 h-56 bg-secondary-200 rounded-full"></div>
          <div className="w-56 h-56 bg-primary-200 rounded-full -ml-16"></div>
        </div>
        <div className="relative w-full h-full grid grid-cols-1 max-w-screen-xl px-6 py-24">
          <RectangleElement
            size={450}
            className="z-[15] absolute bottom-0 -left-24 fill-primary-300 md:flex hidden"
          />
          <RectangleElement
            size={450}
            className="z-[15] absolute top-0 -right-24 fill-primary-300 md:flex hidden"
          />
          <div className="flex items-center relative justify-center  flex-col gap-7 text-center z-20">
            <h3 className="underline-offset-4 tracking-wide underline text-default-600 font-medium decoration-default-600">{`FOR FULL SERVICE RESTAURANT’S `}</h3>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold font-Rethink text-default-900 leading-relaxed md:leading-tight text-balance">
                We ensure{` restaurant's `}
                <br />
                sustainability & Growth
              </h2>
            </div>
            <div className="flex w-full justify-center items-center z-40">
              <div className="w-20 border-t-2 border-default-600" />

              <div className="min-w-fit mx-5">
                <h4 className="font-bold text-default-600">
                  With futuristic <br />
                  technology
                </h4>
              </div>
              <div className="w-20 border-t-2 border-default-600" />
            </div>

            <p className="text-balance font-medium max-w-lg text-default-700">
              QRCuisine helps restaurants save costs, gain real-time analytics,
              and boost efficiency with smart technology
            </p>
            <div className="space-y-2">
              <Button
                size="lg"
                variant="solid"
                color="primary"
                radius="sm"
                className={`text-medium px-7 font-semibold`}
                endContent={<MoveRight size={20} />}
              >
                Try free for 3 months
              </Button>
              <p className="text-[13px] font-semibold font-Rethink text-default-700">{`Trusted by 100’s of restaurants`}</p>
            </div>
          </div>
        </div>
        <div className="w-full z-30">
          <QrScan />
        </div>
      </section>
    </>
  );
}
