"use client";

import React from "react";
import QRCodeScanner from "@/components/modal/QR-Scanner";
import { ScanLine } from "lucide-react";
import { Button, useDisclosure } from "@nextui-org/react";
export default function QrScan() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section
      id="QrScan"
      className="flex items-center justify-center w-full   bg-primary-200  "
    >
      <div className=" w-full h-full flex justify-between items-center  max-w-screen-xl py-5 md:py-10 px-6 z-10">
        <h3 className="text-[#2B251A] text-xl md:text-3xl font-bold">
          Inside a QRCuisine powered restaurant ?
        </h3>
        <Button
          onClick={onOpen}
          color="primary"
          href="#"
          variant="solid"
          className="font-medium w-52 md:w-60"
          size="lg"
          startContent={<ScanLine size={18} />}
        >
          Scan Now
        </Button>

        <QRCodeScanner isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </section>
  );
}