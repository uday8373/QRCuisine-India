"use client";

import React from "react";
import QRCodeScanner from "@/components/modal/QR-Scanner";
import { ScanLine } from "lucide-react";
import { Button, useDisclosure } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function QrScannerForMoblie() {
  const pathName = usePathname();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (
    pathName !== "/" &&
    pathName !== "/register-business" &&
    pathName !== "/home"
  ) {
    return null;
  }

  return (
    <section
      id="QrScan"
      className="flex items-center justify-center w-full sticky bottom-0 z-50 backdrop-blur-md   "
    >
      <div className=" w-full h-full lg:hidden justify-between  flex  items-center py-2 px-6 z-10">
        <h3 className="text-[#2B251A] text-base font-bold">
          Inside a QRCuisine powered restaurant ?
        </h3>
        <Button
          onClick={onOpen}
          color="primary"
          href="#"
          variant="solid"
          className="font-medium "
          size="md"
          startContent={<ScanLine size={18} />}
        >
          Scan Now
        </Button>

        <QRCodeScanner isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </section>
  );
}
