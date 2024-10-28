import { Button, Card, CardFooter } from "@nextui-org/react";
import { SquareDot, SquarePen } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CartButton from "../button/Cart-Button";
import { siteConfig } from "@/config/site";

const MenuGrid = ({
  menuItem,
  onCartChange,
  cartItems,
  onCustomizedOpen,
  setSelecetedFoodItem,
}) => {
  const [isCustomized, setIsCustomized] = useState(false);
  const [textColor, setTextColor] = useState("text-white/95");
  const [subTextColor, setSubTextColor] = useState("text-white/80");

  const getQuantityForItem = (menuItemId) => {
    const item = cartItems?.find((item) => item.id === menuItemId);
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

  const calculateAverageColor = (imageSrc) => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let r = 0,
        g = 0,
        b = 0;
      for (let i = 0; i < imageData.data.length; i += 4) {
        r += imageData.data[i];
        g += imageData.data[i + 1];
        b += imageData.data[i + 2];
      }
      r = Math.floor(r / (imageData.data.length / 4));
      g = Math.floor(g / (imageData.data.length / 4));
      b = Math.floor(b / (imageData.data.length / 4));

      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      if (luminance > 150) {
        setTextColor("text-black");
        setSubTextColor("text-black/70");
      } else {
        setTextColor("text-white/95");
        setSubTextColor("text-white/80");
      }
    };
  };

  useEffect(() => {
    const imageSrc = menuItem.image
      ? menuItem.image
      : "https://res.cloudinary.com/dhflg7es7/image/upload/v1719330520/KidsQuiz/674_1_qxxwlb.jpg";
    calculateAverageColor(imageSrc);
  }, [menuItem.image]);

  return (
    <Card radius="md" className="border-none w-full relative">
      <Image
        alt={menuItem.food_name}
        title={menuItem.food_name}
        className="object-cover w-full h-44"
        src={
          menuItem.image
            ? menuItem.image
            : "https://res.cloudinary.com/dhflg7es7/image/upload/v1719330520/KidsQuiz/674_1_qxxwlb.jpg"
        }
        width={512}
        height={512}
      />
      {isCustomized && (
        <div className="absolute right-2 top-2">
          <Button
            onClick={handleOpenCustomized}
            color="secondary"
            variant="solid"
            size="sm"
            isIconOnly
          >
            <SquarePen size={18} />
          </Button>
        </div>
      )}
      <CardFooter className="backdrop-blur-xl overflow-hidden py-1 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="w-full flex flex-col gap-1 py-1">
          <div className="w-full flex justify-between items-center">
            <p className={`text-small font-semibold line-clamp-1 ${textColor}`}>
              {menuItem.food_name}
            </p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className={`text-tiny font-medium line-clamp-1 ${subTextColor}`}>
              {siteConfig?.currencySymbol}
              {menuItem?.price.toFixed(2)} /-
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
              onCustomizedOpen={onCustomizedOpen}
              setSelecetedFoodItem={setSelecetedFoodItem}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MenuGrid;
