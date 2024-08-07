import { SquareDot } from "lucide-react";
import React from "react";
import CartButton from "../button/Cart-Button";

const MenuList = ({ menuItem, onCartChange, cartItems }) => {
  const getQuantityForItem = (menuItemId) => {
    const item = cartItems.find((item) => item.id === menuItemId);
    return item ? item.quantity : 0;
  };
  return (
    <div className="w-full flex gap-3 justify-between items-center">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 w-full">
          <SquareDot
            size={18}
            className={`${menuItem?.is_veg ? "text-success" : "text-danger"}`}
          />
          <div className="flex flex-col w-full gap-2 text-default-600">
            <h2 className="text-[14px] font-medium line-clamp-2">
              {menuItem?.food_name}
            </h2>
            <div className="flex gap-1 items-center text-default-500">
              <h2 className="text-small font-medium line-clamp-1 text-[14px]">
                ₹{menuItem?.price.toFixed(2)} /- ({menuItem?.quantity} Plate)
              </h2>
            </div>
          </div>
        </div>
      </div>
      <CartButton
        menuItem={menuItem}
        onCartChange={onCartChange}
        quantity={getQuantityForItem(menuItem.id)}
      />
    </div>
  );
};

export default MenuList;
