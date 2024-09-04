import { Button } from "@nextui-org/react";
import { ChevronsRight, Loader } from "lucide-react";
import React from "react";
import Invoice from "./Invoice";

const BillButton = ({ orderData, handleCallWaiter, isLoading }) => {
  return (
    <section id="bill_button_section" className="mb-44">
      <div className="w-full py-5 flex flex-col gap-3 fixed bottom-0 px-5 backdrop-blur-xl shadow-small rounded-t-large">
        <div className="flex w-full justify-between items-center">
          {/* <div className="flex flex-col gap-1">
            <h4 className="text-tiny font-medium text-default-700">
              Grand Total
            </h4>
            <h4 className="text-xl font-bold text-default-900">
              ₹ {orderData.grand_amount}
            </h4>
          </div> */}
          <Invoice orderData={orderData} />
        </div>
        <div className="border-[0.5px] w-full border-dashed border-default-300" />
        <Button
          size="lg"
          spinner={<Loader size={20} className="animate-spin" />}
          isLoading={isLoading}
          isDisabled={isLoading}
          fullWidth
          endContent={<ChevronsRight size={20} />}
          color="primary"
          onClick={() => {
            handleCallWaiter(true);
          }}
        >
          Ask For Bill
        </Button>
      </div>
    </section>
  );
};

export default BillButton;
