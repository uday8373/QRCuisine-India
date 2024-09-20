import React from "react";

export default function Reason() {
  return (
    <section id="thankyou" className=" w-full pb-36 pt-3 px-5">
      <div className="w-full">
        <div className="w-full h-full bg-default-100  p-3 rounded-lg  space-y-2">
          <h3 className="font-semibold  text-lg">Reason for cancellation:</h3>
          <p className="text-default-700 font-normal text-small">
            The item you ordered is currently out of stock. We apologize for any
            inconvenience this may have caused.
          </p>
        </div>
      </div>
    </section>
  );
}
