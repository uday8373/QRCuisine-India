import CallWaiter from "@/components/modal/Call-Waiter";
import OrderPreview from "@/components/modal/Order-Preview";
import supabase from "@/config/supabase";
import { Button, useDisclosure } from "@nextui-org/react";
import { ConciergeBell, ReceiptText } from "lucide-react";
import React, { useEffect, useState } from "react";

const CallWaiterButton = ({ orderData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isWaiterOpen,
    onOpen: onWaiterOpen,
    onOpenChange: onWaiterOpenChange,
  } = useDisclosure();
  const [isCalling, setIsCalling] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (isCalling && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCalling(false);
    }

    return () => clearInterval(timer);
  }, [isCalling, countdown]);

  const handleCallWaiter = async () => {
    const message = `A customer at Table No. ${orderData?.tables?.table_no} has requested a waiter.`;
    const sub_message = "Please attend to the table quickly.";

    const { data, error } = await supabase
      .from("messages")
      .insert({
        table_id: orderData.tables.id,
        restaurant_id: orderData.restaurant_id.id,
        user_id: orderData.user_id,
        order_id: orderData.id,
        waiter_id: orderData.waiters?.id,
        message: message,
        sub_message: sub_message,
        is_read: false,
      })
      .select("id");
    if (error) {
      return console.error(error);
    } else {
      onWaiterOpen();
      setIsCalling(true);
      setCountdown(120);
    }
  };

  const hendleOrderPreview = () => {
    onOpen();
  };

  return (
    <section id="call_waiter_section">
      <div className="w-full fixed bottom-0 px-5 py-5 backdrop-blur-xl flex gap-2 shadow-small rounded-t-large">
        <Button
          onPress={hendleOrderPreview}
          fullWidth
          size="lg"
          startContent={<ReceiptText size={20} />}
          color="default"
        >
          Order Details
        </Button>
        <Button
          onClick={handleCallWaiter}
          isDisabled={isCalling}
          startContent={<ConciergeBell size={20} className="mb-1" />}
          size="lg"
          fullWidth
          color="primary"
        >
          {isCalling
            ? `${Math.floor(countdown / 60)}:${(countdown % 60)
                .toString()
                .padStart(2, "0")}`
            : "Call Waiter"}
        </Button>
      </div>
      <OrderPreview
        orderData={orderData}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <CallWaiter isOpen={isWaiterOpen} onOpenChange={onWaiterOpenChange} />
    </section>
  );
};

export default CallWaiterButton;
