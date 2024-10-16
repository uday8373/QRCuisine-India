import { SquareDot } from "lucide-react";
import React, { useEffect, useState } from "react";
import CartButton from "../button/Cart-Button";
import { Button } from "@nextui-org/react";

const MenuList = ({
  menuItem,
  onCartChange,
  cartItems,
  onCustomizedOpen,
  setSelecetedFoodItem,
}) => {
  const [isCustomized, setIsCustomized] = useState(false);
  const getQuantityForItem = (menuItemId) => {
    const item = cartItems.find((item) => item.id === menuItemId);
    return item ? item.quantity : 0;
  };

  const getCustomization = () => {
    const item = cartItems.find((item) => item.id === menuItem?.id);
    if (!item) {
      setIsCustomized(false);
      return;
    }
    if (
      item?.selectedQuantity ||
      item?.selectedInstructions ||
      item?.selectedSides ||
      item?.selectedAdditionalSides ||
      item?.selectedTemperature
    ) {
      setIsCustomized(true);
      return;
    }
    setIsCustomized(false);
  };

  useEffect(() => {
    getCustomization();
  }, [cartItems]);

  const handleOpenCustomized = () => {
    setSelecetedFoodItem(menuItem);
    onCustomizedOpen(true);
  };
  return (
    <div className="w-full flex gap-3 justify-between items-center">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 w-full">
          <SquareDot
            size={18}
            className={`${
              menuItem?.is_veg ? "text-success" : "text-danger"
            } mt-0.5`}
          />
          <div className="flex flex-col w-full gap-2 text-default-600">
            <h2 className="text-[14px] font-medium line-clamp-2">
              {menuItem?.food_name}
            </h2>
            <div className="flex flex-col gap-1 justify-center text-default-500">
              <h2 className="text-small font-medium line-clamp-1 text-[14px] leading-tight">
                ₹{menuItem?.price.toFixed(2)} /- ({menuItem?.quantity} Plate)
              </h2>
              {isCustomized && (
                <h4
                  onClick={handleOpenCustomized}
                  className="text-xs text-secondary-500 font-bold underline decoration-dotted select-none decoration-2 cursor-pointer"
                >
                  View Customizations
                </h4>
              )}
            </div>
          </div>
        </div>
      </div>
      {menuItem?.is_available ? (
        <CartButton
          menuItem={menuItem}
          onCartChange={onCartChange}
          quantity={getQuantityForItem(menuItem.id)}
          onCustomizedOpen={onCustomizedOpen}
          setSelecetedFoodItem={setSelecetedFoodItem}
        />
      ) : (
        <Button
          size="sm"
          variant="light"
          color="danger"
          radius="sm"
          isDisabled
          className={`text-small font-semibold shadow-sm w-32`}
        >
          Not Available
        </Button>
      )}
    </div>
  );
};

export default MenuList;
