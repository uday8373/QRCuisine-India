"use client";
import { fetchOrderData, fetchStatusData } from "@/apis/preparingApi";
import supabase from "@/config/supabase";
import { Spinner } from "@nextui-org/react";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Status from "./Status";
import OrderStatus from "./Order-Status";
import CallWaiterButton from "./Call-Waiter";
import ScreenError from "@/components/pages/Screen-Error";
import useSmallScreen from "@/hooks/useSmallScreen";
import useStatusNavigate from "@/hooks/useStatusRedirect";

const PreparingMain = () => {
  const router = useRouter();
  const navigateBasedOnStatus = useStatusNavigate();
  const isSmallScreen = useSmallScreen();
  const [orderData, setOrderData] = useState(null);
  const [statusData, setStatusData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const orderId =
    typeof window !== "undefined" ? localStorage.getItem("orderId") : null;

  if (!orderId) {
    notFound();
  }

  const customerStatus =
    typeof window !== "undefined" ? localStorage.getItem("status") : null;

  if (customerStatus !== "preparing") {
    navigateBasedOnStatus();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderResponse, statusResponse] = await Promise.all([
          fetchOrderData(orderId),
          fetchStatusData(),
        ]);
        if (!orderResponse || !statusResponse) {
          console.error("Error fetching order");
        }
        setOrderData(orderResponse);
        setStatusData(statusResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    const orderSubscription = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        async (payload) => {
          const myData = await fetchOrderData(orderId);
          setOrderData(myData);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(orderSubscription);
    };
  }, [orderId]);

  if (orderData?.status_id?.sorting === 4) {
    localStorage.setItem("status", "delivered");
    router.replace("/delivered");
  }

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
      <OrderStatus orderData={orderData} />
      <Status orderData={orderData} statusData={statusData} />
      <CallWaiterButton orderData={orderData} />
    </div>
  );
};

export default PreparingMain;
