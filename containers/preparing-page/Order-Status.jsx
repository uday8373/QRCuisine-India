import React, { useEffect, useState } from "react";
import LottieAnimation from "@/components/lottie/LottieAnimation";

import Received from "@/components/lottie/received.json";
import Confirm from "@/components/lottie/confirm.json";
import Preparing from "@/components/lottie/preparing.json";

const OrderStatus = ({ orderData }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const { restaurant_id, table_id, status_id } = orderData || {};
  const { logo, restaurant_name } = restaurant_id || {};
  const { table_no } = table_id || {};
  const { sorting } = status_id || {};

  const renderLottieAnimation = (sorting) => {
    switch (sorting) {
      case 1:
        return (
          <LottieAnimation width={150} height={150} animationData={Received} />
        );
      case 2:
        return (
          <LottieAnimation width={150} height={150} animationData={Confirm} />
        );
      case 3:
        return (
          <LottieAnimation width={150} height={150} animationData={Preparing} />
        );
      default:
        return null;
    }
  };

  const getRestaurantName = (name) => {
    return name && name.length > 15 ? `${name.slice(0, 15)}...` : name;
  };

  let bgColorClass = "";
  let textColorClass = "";

  switch (orderData?.status_id?.sorting) {
    case 1:
      bgColorClass = "bg-blue-500";
      textColorClass = "text-blue-500";
      break;
    case 2:
      bgColorClass = "bg-success";
      textColorClass = "text-success";
      break;
    case 3:
      bgColorClass = "bg-primary";
      textColorClass = "text-primary";
      break;
    default:
      bgColorClass = "bg-default";
      textColorClass = "text-default";
  }

  useEffect(() => {
    if (!orderData) return;

    const targetTime =
      new Date(orderData?.created_at).getTime() +
      orderData.preparation_time * 60000;

    const updateRemainingTime = () => {
      const now = new Date().getTime();
      const timeLeft = targetTime - now;

      if (timeLeft <= 0) {
        setRemainingTime("00:00");
      } else {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        setRemainingTime(
          `${minutes < 10 ? "0" : ""}${minutes}:${
            seconds < 10 ? "0" : ""
          }${seconds}`
        );
      }
    };

    const intervalId = setInterval(updateRemainingTime, 1000);

    updateRemainingTime();

    return () => clearInterval(intervalId);
  }, [orderData]);
  return (
    <section id="order_status">
      <div
        className={`w-full flex flex-col rounded-b-large ${bgColorClass} px-5 bg-opacity-10`}
      >
        <div className="w-full flex flex-col justify-center items-center gap-1 py-5">
          <div className="w-full flex justify-center flex-col items-center gap-1">
            <h2 className="text-default-600 font-semibold text-small">
              Order ID : {orderData?.order_id}
            </h2>
          </div>
          <div>{renderLottieAnimation(sorting)}</div>
          <h3 className={`text-default-600 text-semibold font-medium`}>
            Waiting Time:
            <span className={`${textColorClass} text-large font-bold px-2`}>
              {remainingTime || "Calculating..."}
            </span>
            {remainingTime && "Minutes"}
          </h3>
        </div>
      </div>
    </section>
  );
};

export default OrderStatus;
