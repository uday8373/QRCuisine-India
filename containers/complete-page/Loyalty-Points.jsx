import React from "react";
import { Button } from "@nextui-org/react";
import { TicketCheck } from "lucide-react";

export default function LoyaltyPoints() {
  return (
    <section id="thankyou" className=" w-full pb-28  px-5">
      <div className="w-full">
        <div className="w-full h-full bg-warning-100 p-3 rounded-lg  space-y-2">
          <p className="text-amber-700 text-sm  font-semibold">
            {`You've earned 50 points with this purchase!
      Redeem your points for discounts on your next order.`}
          </p>
          <Button
            color="warning"
            size="md"
            className="text-small  text-white font-medium rounded-large"
            startContent={<TicketCheck size={18} />}
          >
            Redeem Now
          </Button>
        </div>
      </div>
    </section>
  );
}
