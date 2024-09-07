"use client";
import {
  fetchOrderData,
  fetchStatusData,
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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSound from "use-sound";

const PreparingMain = () => {
  const [play, { sound, isPlaying }] = useSound("/sounds/water_droplet.mp3", {
    volume: 100,
    onError: (error) => {
      console.error("Error loading sound:", error);
    },
  });
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

  const playMusic = () => {
    play();
  };

  const fetchNotification = async () => {
    try {
      console.log("Fetching notifications for user:", userId);
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

      if (error) {
        throw error;
      }

      if (data) {
        setNotifications(data);

        // Show notifications where user_read is false
        data.forEach((notification) => {
          if (!notification.user_read) {
            toast(notification.message, {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",

              onClose: async () => {
                try {
                  const { error: updateError } = await supabase
                    .from("messages")
                    .update({ user_read: true })
                    .eq("id", notification.id); // Assuming each notification has a unique id

                  if (updateError) {
                    console.error(
                      "Error updating user_read:",
                      updateError.message
                    );
                  } else {
                    console.log(
                      "Notification marked as read:",
                      notification.id
                    );
                  }
                } catch (error) {
                  console.error(
                    "Error updating user_read on close:",
                    error.message
                  );
                }
              },
            });
            play();
            console.log("Playing notification sound");
          }
        });

        console.log("Fetched notifications:", data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching order and status data for orderId:", orderId);
        const [orderResponse, statusResponse] = await Promise.all([
          fetchOrderData(orderId),
          fetchStatusData(),
        ]);
        if (!orderResponse || !statusResponse) {
          console.error("Error fetching order or status data");
        }
        setOrderData(orderResponse);
        setStatusData(statusResponse);
      } catch (error) {
        console.error("Error during data fetching:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    console.log("Setting up subscriptions for orders and messages");

    // Subscribe to order changes
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
          console.log("Order payload received:", payload);
          const myData = await fetchOrderData(orderId);
          setOrderData(myData);
          console.log("Updated order data:", myData);
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

    // Subscribe to real-time notifications
    const notificationSubscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Notification payload received:", payload);
          const newNotification = payload.new;
          setNotifications((prevNotifications) => [
            newNotification,
            ...prevNotifications,
          ]);
          fetchNotification();
        }
      )
      .subscribe();

    return () => {
      console.log("Removing Supabase subscriptions");
      supabase.removeChannel(orderSubscription);
      supabase.removeChannel(notificationSubscription);
    };
  }, [orderId, userId]);

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
      <button onClick={playMusic}>Boop!</button>
      <Header orderData={orderData} />
      <OrderStatus orderData={orderData} />
      <Status orderData={orderData} statusData={statusData} />
      <CallWaiterButton orderData={orderData} />
      <ToastContainer />
    </div>
  );
};

export default PreparingMain;
