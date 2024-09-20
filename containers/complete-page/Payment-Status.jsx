import Happy from "@/components/icons/happy";
import { BookCheck, IndianRupee } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function PaymentStatus() {
  return (
    <section id="thankyou" className=" w-full px-5  py-5">
      <div
        className=" w-full   py-5 bg-white rounded-lg border
      "
      >
        <div className=" w-full flex flex-col px-5 gap-4 ">
          <div className="space-y-2">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold ">Payment Status</h3>
              <p className="flex items-center font-medium  gap-1 text-success">
                <BookCheck size={16} />
                Paid
              </p>
            </div>

            <div className="flex items-center font-medium text-xl  w-full">
              <h3>Total:</h3>{" "}
              <p className="flex items-center">
                <IndianRupee size={16} />
                89.82
              </p>
            </div>
          </div>
          <div className="flex items-center  justify-center bg-default-100  py-5 rounded-lg  w-full">
            <Image
              src="/assets/svg/PaymentQR.svg"
              alt="PaymentQR"
              width={0}
              height={0}
              className="w-full h-44 "
            />
          </div>
          <p className="text-default-500 font-normal text-sm text-center">
            Scan this QR code with your mobile payment app to compelete the
            transaction.
          </p>
        </div>
      </div>
    </section>
  );
}
