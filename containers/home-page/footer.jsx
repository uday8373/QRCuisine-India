import { Logo } from "@/components/icons/icons";
import { Button } from "@nextui-org/react";
import React from "react";

export default function Footer() {
  return (
    <>
      <section
        id="ControlOrders"
        className="flex items-center flex-col justify-center w-full bg-gradient-to-t from-secondary-100  to-primary-100  "
      >
        <div className=" w-full h-full space-y-5 relative  max-w-screen-xl px-6   z-10">
          <div className="w-full flex items-start pt-5">
            <h2 className="text-secondary font-medium text-4xl">About Us</h2>
          </div>
          <div className="w-full grid  grid-cols-1 gap-5  md:grid-cols-2 pb-16 pt-5 ">
            <div className="space-y-3">
              <Logo />

              <div>
                <h3>myqrcuisine@gmail.com</h3>
                <h4>9064504565</h4>
              </div>
              <p>
                Purulia, West Bengal <br />
                India
              </p>
              <p>
                A product by <span className="font-bold ">Erex Studio</span>
              </p>
            </div>
            <div className="flex  items-center justify-center  flex-col gap-5 w-full h-full ">
              <div className=" w-full md:justify-center items-center flex ">
                <Button
                  size="lg"
                  variant="solid"
                  color="primary"
                  radius="sm"
                  className={`text-small !w-60  font-semibold shadow-sm `}
                >
                  Schedule a demo
                </Button>
              </div>{" "}
              <div className=" w-full md:justify-center items-center flex">
                <Button
                  size="lg"
                  variant="solid"
                  color="secondary"
                  radius="sm"
                  className={`text-small !w-60  font-semibold shadow-sm `}
                >
                  Register Restaurant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
