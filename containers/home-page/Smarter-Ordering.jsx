import { BannerTransparent } from "@/public/assets/svg/Home-Page/Index";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export default function SmarterOrdering() {
  return (
    <>
      <section
        id="SmarterOrdering"
        className="flex items-center flex-col justify-center w-full  bg-primary-100 "
      >
        <div className=" w-full h-full grid grid-cols-1 lg:grid-cols-2   max-w-screen-xl   z-10">
          <div>
            <Image
              width={0}
              height={0}
              className="w-full h-full   "
              src={BannerTransparent}
              alt="BannerTransparent"
            />
          </div>

          <div className="w-full h-full flex flex-col gap-5 pb-14 md:pb-20 lg:pb-0 justify-center items-center">
            <div className=" space-y-5">
              <h3 className="text-4xl font-bold leading-inherit">
                Smarter Ordering,
                <br />
                Deeper Insights
                <span className="text-primary ">
                  {" "}
                  <br />- All with a QR Scan
                </span>
              </h3>
              <Button
                size="lg"
                variant="solid"
                color="primary"
                radius="sm"
                className={`text-small px-10  font-semibold shadow-sm `}
              >
                Try free for 3 months
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
