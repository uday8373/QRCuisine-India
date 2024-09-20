import React from "react";

export default function OrderDetails() {
  return (
    <section id="thankyou" className=" w-full  px-5">
      <div className="w-full">
        <div className="w-full h-full bg-default-100  p-3 rounded-large  space-y-2">
          <h3 className="text-default-500 flex items-center gap-1">
            Order ID: <p className="text-black">00016</p>
          </h3>
          <h3 className="text-default-500 flex items-center gap-1">
            Date: <p className="text-black"> May 15 2024</p>
          </h3>
          <h3 className="text-default-500 flex items-center gap-1">
            Total: <p className="text-black"> 560</p>
          </h3>
        </div>
      </div>
    </section>
  );
}
