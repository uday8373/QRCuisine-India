"use client";
import React, { useState } from "react";
import Header from "./Header";
import ItemList from "./Item-List";
import Preferences from "./Preferences";
import { useDisclosure } from "@nextui-org/react";
import Instructions from "@/components/modal/Instructions";
import Bill from "./Bill";
import CheckoutButton from "./Checkout-Button";
import AddDetails from "@/components/modal/Add-Details";
import { notFound, useRouter } from "next/navigation";
import useSmallScreen from "@/hooks/useSmallScreen";
import ScreenError from "@/components/pages/Screen-Error";
import supabase from "@/config/supabase";
import useStatusNavigate from "@/hooks/useStatusRedirect";

const CheckoutMain = () => {
  const router = useRouter();
  const navigateBasedOnStatus = useStatusNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onOpenChange: onDetailsOpenChange,
  } = useDisclosure();
  const storeRestaurantData =
    typeof window !== "undefined"
      ? localStorage.getItem("restaurantData")
      : null;
  const storeTableData =
    typeof window !== "undefined" ? localStorage.getItem("tableData") : null;
  const storeCartData =
    typeof window !== "undefined" ? localStorage.getItem("cartItems") : null;
  const storeInstructionsData =
    typeof window !== "undefined" ? localStorage.getItem("instructions") : null;
  const initialRestaurantData = storeRestaurantData
    ? JSON.parse(storeRestaurantData)
    : null;
  const initialTableData = storeTableData ? JSON.parse(storeTableData) : null;
  const initialCartData = storeCartData ? JSON.parse(storeCartData) : [];
  const initialInstructionsData = storeInstructionsData
    ? JSON.parse(storeInstructionsData)
    : null;
  const [restaurantData, setRestaurantData] = useState(initialRestaurantData);
  const [tableData, setTableData] = useState(initialTableData);
  const [cartItems, setCartItems] = useState(initialCartData);
  const [mainInstructions, setMainInstructions] = useState(
    initialInstructionsData
  );
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    mobile: "",
  });
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [loading, setLoading] = useState(false);
  const isSmallScreen = useSmallScreen();

  if (!restaurantData || !tableData || !cartItems) {
    return notFound();
  }

  const customerStatus =
    typeof window !== "undefined" ? localStorage.getItem("status") : null;

  if (customerStatus !== "checkout") {
    navigateBasedOnStatus();
  }

  const handleCartChange = (menuItem, quantity) => {
    setCartItems((prevCartItems) => {
      const itemIndex = prevCartItems.findIndex(
        (item) => item.id === menuItem.id
      );
      let updatedCartItems;

      if (itemIndex !== -1) {
        updatedCartItems = [...prevCartItems];
        updatedCartItems[itemIndex].quantity = quantity;
        updatedCartItems = updatedCartItems.filter((item) => item.quantity > 0);
      } else {
        updatedCartItems = [...prevCartItems, { ...menuItem, quantity }];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const gst = restaurantData?.gst_percentage;

  const gstAmount = (totalPrice * gst) / 100;
  const grandTotal = totalPrice + gstAmount;

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/\s{2,}/.test(value)) {
      setNameError("Double spaces are not allowed");
    } else {
      setNameError("");
      setPersonalDetails((prevDetails) => ({
        ...prevDetails,
        name: value,
      }));
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/\s{2,}/.test(value)) {
      setMobileError("Double spaces are not allowed");
    } else {
      setMobileError("");
      setPersonalDetails((prevDetails) => ({
        ...prevDetails,
        mobile: value,
      }));
    }
  };
  const handleOrderCreate = async (id) => {
    try {
      const { data: maxOrderData, error: maxOrderError } = await supabase
        .from("orders")
        .select("order_id")
        .eq("restaurant_id", restaurantData.id)
        .order("order_id", { ascending: false })
        .limit(1);
      if (maxOrderError) throw maxOrderError;

      let newOrderId = "00001";
      if (maxOrderData && maxOrderData.length > 0) {
        const maxOrderId = maxOrderData[0].order_id;
        newOrderId = String(parseInt(maxOrderId) + 1).padStart(5, "0");
      }
      const { data, error } = await supabase
        .from("orders")
        .insert([
          {
            restaurant_id: restaurantData.id,
            table_id: tableData.id,
            user_id: id,
            fooditem_ids: cartItems,
            instructions: mainInstructions,
            total_amount: totalPrice,
            tax_amount: gstAmount,
            grand_amount: grandTotal,
            order_id: newOrderId,
          },
        ])
        .select();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleSubmit = async () => {
    if (!personalDetails.name) {
      setNameError("Name is required");
      return;
    }
    if (!personalDetails.mobile) {
      setMobileError("Mobile number is required");
      return;
    }
    if (nameError || mobileError) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            name: personalDetails.name,
            mobile: personalDetails.mobile,
            restaurant_id: restaurantData.id,
            table_id: tableData.id,
          },
        ])
        .select();

      if (error) {
        throw error;
      } else {
        const orderCreate = await handleOrderCreate(data[0].id);
        localStorage.setItem("orderId", orderCreate[0].id);
        localStorage.setItem("status", "preparing");
        router.replace("/preparing");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("restaurantData");
        localStorage.removeItem("instructions");
      }
    } catch (error) {
      console.error("Error creating user or order:", error);
    } finally {
      onDetailsOpenChange(false);
      setLoading(false);
    }
  };

  if (!isSmallScreen) {
    return <ScreenError />;
  }

  return (
    <>
      <Header restaurantData={restaurantData} tableData={tableData} />
      <ItemList menuItems={cartItems} handleCartChange={handleCartChange} />
      <Preferences
        mainInstructions={mainInstructions}
        onOpen={onOpen}
        tableId={tableData?.id}
        restaurantName={restaurantData?.restaurant_name}
      />
      <Bill
        totalPrice={totalPrice}
        gstAmount={gstAmount}
        grandTotal={grandTotal}
      />
      <CheckoutButton
        onOpen={onDetailsOpen}
        restaurantData={restaurantData}
        tableData={tableData}
        loading={loading}
      />
      <Instructions
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        mainInstructions={mainInstructions}
        setMainInstructions={setMainInstructions}
      />
      <AddDetails
        isOpen={isDetailsOpen}
        onOpenChange={onDetailsOpenChange}
        setPersonalDetails={setPersonalDetails}
        personalDetails={personalDetails}
        handleNameChange={handleNameChange}
        handleMobileChange={handleMobileChange}
        handleSubmit={handleSubmit}
        nameError={nameError}
        mobileError={mobileError}
      />
    </>
  );
};

export default CheckoutMain;
