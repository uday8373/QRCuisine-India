"use client";
import { fetchOrderData } from "@/apis/preparingApi";
import { Spinner } from "@nextui-org/react";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ScreenError from "@/components/pages/Screen-Error";
import useSmallScreen from "@/hooks/useSmallScreen";
import Header from "../preparing-page/Header";
import DeliveredStatus from "./Delivered-Status";
import WaiterStatus from "./Waiter-Status";
import CustomRating from "./Custom-Rating";
import BillButton from "./Bill-Button";
import supabase from "@/config/supabase";
import useStatusNavigate from "@/hooks/useStatusRedirect";

const DeliveredMain = () => {
  const router = useRouter();
  const navigateBasedOnStatus = useStatusNavigate();
  const isSmallScreen = useSmallScreen();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const orderId =
    typeof window !== "undefined" ? localStorage.getItem("orderId") : null;

  const customerStatus =
    typeof window !== "undefined" ? localStorage.getItem("status") : null;

  if (customerStatus !== "delivered") {
    navigateBasedOnStatus();
  }

  useEffect(() => {
    if (!orderId) {
      notFound();
    }
  }, [orderId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderResponse] = await Promise.all([fetchOrderData(orderId)]);
        if (!orderResponse) {
          console.error("Error fetching order");
        }
        setOrderData(orderResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [orderId]);

  const updataTable = async () => {
    const { data, error } = await supabase
      .from("tables")
      .update({ is_booked: false, persons: null })
      .eq("id", orderData?.tables?.id)
      .select();
    if (error) {
      throw error;
    } else {
      setTimeout(() => {
        localStorage.clear();
      }, 2000);
      router.replace("/complete");
      setButtonLoading(false);
    }
  };

  const handleCallWaiter = async () => {
    setButtonLoading(true);
    const message = `Please call the waiter to prepare the bill for table no: ${orderData?.tables?.table_no}`;

    const { data, error } = await supabase
      .from("messages")
      .insert({
        table_id: orderData?.tables?.id,
        waiter_id: orderData?.waiters?.id,
        restaurant_id: orderData?.restaurant_id?.id,
        user_id: orderData?.user_id,
        order_id: orderData?.id,
        message: message,
      })
      .select("*");
    if (error) {
      throw new error();
    } else {
      updataTable();
    }
  };

  if (!isSmallScreen) {
    return <ScreenError />;
  }

  if (isLoading) {
    return (
      <div className="w-full h-svh flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Header orderData={orderData} />
      <DeliveredStatus orderData={orderData} />
      <WaiterStatus orderData={orderData} />
      <CustomRating
        restaurant_id={orderData?.restaurant_id?.id}
        order_id={orderData?.id}
        table_id={orderData?.tables?.id}
        user_id={orderData?.user_id}
      />
      <BillButton
        grandAmount={orderData?.grand_amount}
        handleCallWaiter={handleCallWaiter}
        isLoading={buttonLoading}
      />
    </div>
  );
};

export default DeliveredMain;
