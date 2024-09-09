"use client";
import {
  fetchOrderData,
  fetchStatusData,
  getNotifications,
  updateNofication,
  updateVisitorConfirm,
  updateVisitorDelivered,
  updateVisitorPreparing,
} from "@/apis/preparingApi";
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
import { NotificationList } from "./Notification";

const PreparingMain = () => {
  const router = useRouter();
  const navigateBasedOnStatus = useStatusNavigate();
  const [notifications, setNotifications] = useState([]);
  const isSmallScreen = useSmallScreen();
  const [orderData, setOrderData] = useState(null);
  const [statusData, setStatusData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const orderId =
    typeof window !== "undefined" ? localStorage.getItem("orderId") : null;

  if (!orderId) {
    notFound();
  }

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  if (!userId) {
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
        const [orderResponse, statusResponse, notificationResponse] =
          await Promise.all([
            fetchOrderData(orderId),
            fetchStatusData(),
            getNotifications(orderId, userId),
          ]);
        if (!orderResponse || !statusResponse) {
          console.error("Error fetching order or status data");
        }
        setOrderData(orderResponse);
        setStatusData(statusResponse);
        const reversedNotifications = [...notificationResponse].reverse();
        setNotifications(reversedNotifications);
      } catch (error) {
        console.error("Error during data fetching:", error);
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
          if (myData.status_id.sorting === 2) {
            await updateVisitorConfirm(myData.restaurant_id.id);
          }
          if (myData.status_id.sorting === 3) {
            await updateVisitorPreparing(myData.restaurant_id.id);
          }
          if (myData.status_id.sorting === 4) {
            await updateVisitorDelivered(myData.restaurant_id.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(orderSubscription);
    };
  }, [orderId, userId]);

  useEffect(() => {
    const playNotificationSound = () => {
      const audio = new Audio("/sounds/notification1.mp3");
      audio.play();
    };
    const messageSubscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `order_id=eq.${orderId}`,
        },
        async (payload) => {
          if (payload.new.user_read === false) {
            playNotificationSound();
            setNotifications((prev) => {
              const updatedNotifications = [...prev, payload.new];
              return updatedNotifications;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [orderId, userId]);

  if (orderData?.status_id?.sorting === 4) {
    localStorage.setItem("status", "delivered");
    router.replace("/delivered");
  }

  const handleUpdate = async (id) => {
    const result = await updateNofication(id);
    if (result) {
      const response = await getNotifications(orderId, userId);
      const reversedNotifications = [...response].reverse();
      setNotifications(reversedNotifications);
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
      <OrderStatus orderData={orderData} />
      {notifications.length > 0 && (
        <NotificationList
          notifications={notifications}
          handleUpdate={handleUpdate}
        />
      )}
      <Status orderData={orderData} statusData={statusData} />
      <CallWaiterButton orderData={orderData} />
    </div>
  );
};

export default PreparingMain;
