import { Avatar } from "@nextui-org/react";
import React from "react";

const Header = ({ restaurantData, tableData }) => {
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
            src={restaurantData?.logo}
            className="w-8 h-8 text-large text-white"
          />

          <h1 className="text-medium font-semibold">
            {restaurantData.restaurant_name.length > 15
              ? `${restaurantData.restaurant_name.slice(0, 15)}...`
              : restaurantData.restaurant_name}
          </h1>
        </div>
        <div
          className="bg-secondary flex  flex-col px-4 py-2 justify-center items-center
         h-full "
        >
          <h3 className="text-sm font-bold text-white">TABLE</h3>
          <p className="text-3xl font-black tracking-wider text-white leading-7">
            {formatTableNumber(tableData?.table_no)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
