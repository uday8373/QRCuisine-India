import { Avatar } from "@nextui-org/react";
import React from "react";

const Header = ({ orderData }) => {
  const formatTableNumber = (tableNo) => {
    return tableNo && tableNo < 10 ? `0${tableNo}` : tableNo;
  };

  return (
    <section
      id="checkout_header"
      className="shadow-small sticky top-0 backdrop-blur-xl z-30 pl-5"
    >
      <div className="flex w-full items-center justify-between  relative">
        <div className="flex gap-2 items-center">
          <Avatar
            src={orderData?.restaurant_id?.logo}
            className="w-8 h-8 text-large text-white"
          />

          <h1 className="text-medium font-semibold">
            {orderData?.restaurant_id?.restaurant_name.length > 15
              ? `${orderData?.restaurant_id?.restaurant_name.slice(0, 15)}...`
              : orderData?.restaurant_id?.restaurant_name}
          </h1>
        </div>
        <div
          className=" bg-primary flex  flex-col px-4 py-2 justify-center items-center
         h-full "
        >
          <h3 className="text-medium font-bold text-white">TABLE</h3>
          <p className="text-xl font-bold -tracking-tighter text-white">
            {formatTableNumber(orderData?.tables?.table_no)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
