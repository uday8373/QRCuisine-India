import { Button } from "@nextui-org/react";
import { ArrowLeftFromLine, Download, UserPen } from "lucide-react";
import React from "react";

export default function Footer({ handleclearLocalStorage }) {
  return (
    <section
      id="checkout_bottom"
      className="fixed bottom-0 backdrop-blur-xl shadow-small flex justify-center mx-auto w-full px-5 rounded-t-large"
    >
      <div className="py-5 gap-2 w-full grid grid-cols-2">
        <Button
          onClick={() => handleclearLocalStorage()}
          variant="solid"
          color="default"
          className="text-small  font-medium rounded-large"
          startContent={<ArrowLeftFromLine size={20} />}
        >
          Back to Home
        </Button>
        <Button
          color="success"
          variant="solid"
          className="text-small text-white font-medium rounded-large"
          startContent={<Download size={18} />}
        >
          Download Invoice
        </Button>
      </div>
    </section>
  );
}
