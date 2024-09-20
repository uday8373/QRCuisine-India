import { Button } from "@nextui-org/react";
import { ArrowLeftFromLine, PhoneCall } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <section
      id="Cancel_bottom"
      className="fixed bottom-0 backdrop-blur-xl shadow-small flex justify-center mx-auto w-full px-5 rounded-t-large"
    >
      <div className="py-5 gap-2 w-full grid grid-cols-1">
        <Button
          variant="solid"
          color="default"
          className="text-small  font-medium rounded-large"
          startContent={<PhoneCall size={20} />}
        >
          Contact Support
        </Button>
        <Button
          color="success"
          variant="solid"
          className="text-small text-white font-medium rounded-large"
          startContent={<ArrowLeftFromLine size={18} />}
        >
          Return to Order History
        </Button>
      </div>
    </section>
  );
}
