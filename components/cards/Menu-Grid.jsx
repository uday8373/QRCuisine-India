import { Card, CardFooter } from "@nextui-org/react";
import { SquareDot } from "lucide-react";
import Image from "next/image";
import React from "react";
import CartButton from "../button/Cart-Button";

const MenuGrid = ({ menuItem, onCartChange, cartItems }) => {
  const getQuantityForItem = (menuItemId) => {
    const item = cartItems.find((item) => item.id === menuItemId);
    return item ? item.quantity : 0;
  };
  return (
    <Card radius="md" className="border-none w-full">
      <Image
        alt={menuItem.food_name}
        title={menuItem.food_name}
        className="object-cover w-full h-48"
        // src={menuItem.image}
        width={512}
        height={512}
        src="https://res.cloudinary.com/dhflg7es7/image/upload/v1719330520/KidsQuiz/674_1_qxxwlb.jpg"
      />
      <CardFooter className="backdrop-blur-xl overflow-hidden py-1 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="w-full flex flex-col gap-1 py-1">
          <p className="text-small text-white/95 font-semibold line-clamp-1">
            {menuItem.food_name}
          </p>
          <div className="w-full flex justify-between items-center">
            <p className="text-tiny text-white/80 font-medium line-clamp-1">
              {menuItem?.price.toFixed(2)} /- ({menuItem?.quantity} Plate)
            </p>
            <SquareDot
              size={18}
              className={`${menuItem?.is_veg ? "text-success" : "text-danger"}`}
            />
          </div>
          <div className="w-full flex pt-1 justify-between items-center">
            <CartButton
              fullWidth
              menuItem={menuItem}
              onCartChange={onCartChange}
              quantity={getQuantityForItem(menuItem.id)}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MenuGrid;
