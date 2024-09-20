"use client";
import confetti from "canvas-confetti";
import React, { useEffect, useState } from "react";
import useSmallScreen from "@/hooks/useSmallScreen";
import ScreenError from "@/components/pages/Screen-Error";

import ThankYou from "./Thank-You";
import PaymentStatus from "./Payment-Status";
import Footer from "./footer";
import LoyaltyPoints from "./Loyalty-Points";
import { fetchOrderData } from "@/apis/preparingApi";
import { useRouter, notFound } from "next/navigation";
import Header from "./Header";

const CompleteMain = () => {
  const router = useRouter();

  const isSmallScreen = useSmallScreen();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const orderId =
    typeof window !== "undefined" ? localStorage.getItem("orderId") : null;
  useEffect(() => {
    if (!orderId) {
      notFound();
    }
  }, [orderId]);

  useEffect(() => {
    const handleClick = () => {
      const end = Date.now() + 1 * 1000;
      const colors = ["#f8deb1", "#eca184", "#fd8bbc", "#a786ff"];

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 45,
          startVelocity: 60,
          origin: { x: 0, y: 1 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 45,
          startVelocity: 60,
          origin: { x: 1, y: 1 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };
      frame();
    };

    handleClick();
  }, []);

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

  if (!isSmallScreen) {
    return <ScreenError />;
  }

  const handleclearLocalStorage = () => {
    router.replace("/");
    setTimeout(async () => {
      await clearLocalStorage();
    }, 3000);
  };

  return (
    <section
      id="complete"
      className="w-full h-svh flex  items-center  flex-col "
    >
      <Header orderData={orderData} />
      <ThankYou orderData={orderData} />
      <PaymentStatus />
      <LoyaltyPoints />
      <Footer handleclearLocalStorage={handleclearLocalStorage} />
    </section>
  );
};

export default CompleteMain;
