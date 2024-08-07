import React from "react";
import { Logo } from "../icons/icons";

const ScreenError = () => {
  return (
    <main
      id="screen_error_page"
      className="flex items-center justify-center w-full h-svh"
    >
      <section className="w-full h-full flex-col max-w-screen-xl px-6">
        <div className="w-full h-full flex flex-col justify-center items-center gap-2 -mt-20">
          <Logo size={250} />
          <h4 className="text-xl -mt-20 text-center">
            To use{" "}
            <label className="font-semibold tracking-wide">
              TABLE<span className="text-primary">QR</span>
            </label>{" "}
            web application, please visit this url using a tablet or mobile
            device.
          </h4>
        </div>
      </section>
    </main>
  );
};

export default ScreenError;
