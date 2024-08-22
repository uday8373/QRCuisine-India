"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const [imgSrc, setImgSrc] = useState("/assets/hero.png");

  const handleImageError = () => {
    setImgSrc("https://via.placeholder.com/300x200");
  };

  return (
    <section
      id="homepage_hero_section"
      className="flex items-center justify-center w-full bg-primary min-h-[80vh]"
    >
      <div className="w-full h-full flex-col max-w-screen-xl px-6">
        <div className="w-full h-full flex md:flex-row flex-col-reverse justify-between items-center py-5 gap-3">
          <div className="w-full flex flex-col justify-center md:gap-5 gap-3">
            <h1 className="xl:text-7xl lg:text-6xl md:text-5xl text-4xl font-bold text-white leading-tight md:leading-tight lg:leading-tight xl:leading-[85px]">
              Say goodbye to Clunky menus & wait time
            </h1>
            <p className="md:text-xl text-md text-white font-semibold">
              Elevate your Dining Experience with TableQr!
            </p>
            <div className="flex gap-2 md:gap-5 items-center">
              <Button
                size="lg"
                color="danger"
                radius="full"
                className="md:mt-5 w-40 font-medium"
              >
                Schedule Demo
              </Button>
              <Button
                size="lg"
                className="md:mt-5 w-44"
                color="default"
                radius="full"
              >
                <Link
                  className="w-full h-full flex items-center justify-center font-medium"
                  href="/register-business"
                >
                  Add business
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-full h-full flex items-center justify-end">
            <Image
              width={1080}
              height={1080}
              src={imgSrc}
              alt="hero"
              onError={handleImageError}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
