"use client";
import EndSession from "@/components/modal/End-Session";
import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import { LogOut } from "lucide-react";
import Image from "next/image";
import React from "react";

const Hero = ({ restaurantData, tableData, userId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <section
      id="restaurant_hero_section"
      className="flex items-center justify-center w-full bg-primary h-60 relative"
    >
      <div className="w-full h-full flex-col max-w-screen-xl relative">
        <Image
          priority
          width={1080}
          height={1080}
          radius="none"
          removeWrapper
          className="w-full object-cover h-full"
          src={restaurantData?.background_image}
          alt={restaurantData?.restaurant_name}
          title={restaurantData?.restaurant_name}
        />
        <div className="w-full h-full bg-black/60 absolute top-0 z-10" />
        <div className="w-full h-60 absolute flex justify-center items-center flex-col top-0 z-30 gap-3 px-6">
          <div className="absolute top-2 right-2">
            <Button
              isIconOnly
              onClick={onOpen}
              size="sm"
              variant="light"
              color="danger"
            >
              <LogOut className="text-danger-500" />
            </Button>
          </div>

          <Avatar
            src={restaurantData?.logo}
            className="w-16 h-16 text-large text-white"
          />
          <h1 className="text-2xl font-semibold line-clamp-1 text-white/90">
            {restaurantData?.restaurant_name}
          </h1>
          <h3 className="text-sm text-white/85">
            - By{" "}
            <label className="tracking-wider font-medium">
              TABLE<span className="text-primary">QR</span>
            </label>
          </h3>
          <h2 className="text-large font-semibold line-clamp-1 text-white/90">
            Table No - {tableData?.table_no}
          </h2>
        </div>
      </div>
      <EndSession
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        tableId={tableData?.id}
        restaturantId={restaurantData?.id}
        userId={userId}
      />
    </section>
  );
};

export default Hero;
