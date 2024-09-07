import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section
      id="homepage_hero_section"
      className="flex items-center justify-center w-full bg-primary min-h-[80vh]"
    >
      <div className="w-full h-full flex-col max-w-screen-xl px-6 z-10">
        <div className="w-full h-full flex md:flex-row flex-col-reverse justify-between items-center py-5 gap-3">
          <div className="w-full flex flex-col justify-center md:gap-5 gap-3">
            <h1 className="xl:text-7xl lg:text-6xl md:text-5xl text-4xl font-bold text-white leading-tight md:leading-tight lg:leading-tight xl:leading-[85px]">
              Say goodbye to Clunky menus & wait time
            </h1>
            <p className="md:text-xl text-md text-white font-semibold">
              Elevate your Dining Experience with QRCuisine!
            </p>
            <div className="flex gap-2 md:gap-5 items-center">
              <Button
                as={Link}
                size="lg"
                href="/book-free-demo"
                color="danger"
                radius="full"
                className="md:mt-5 w-40 font-medium"
              >
                Schedule Demo
              </Button>
              <Button
                as={Link}
                size="lg"
                href="/restaurant-registration"
                color="secondary"
                variant="solid"
                radius="full"
                className="md:mt-5 w-40 font-medium"
              >
                Register Now
              </Button>
            </div>
          </div>
          <div className="w-full h-full flex items-center justify-end">
            <Image
              width={1080}
              height={1080}
              src="/assets/hero.png"
              alt="hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
