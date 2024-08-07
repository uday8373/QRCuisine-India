import { Avatar } from "@nextui-org/react";
import React from "react";

const Header = ({ restaurantData, tableData }) => {
  return (
    <section
      id="checkout_header"
      className="shadow-small sticky top-0 backdrop-blur-xl z-30 px-5"
    >
      <div className="flex w-full items-center justify-between py-5 relative">
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
        <h2 className="text-medium font-bold text-primary">
          Table No - {tableData.table_no}
        </h2>
      </div>
    </section>
  );
};

export default Header;
