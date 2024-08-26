import CallWaiter from "@/components/modal/Call-Waiter";
import supabase from "@/config/supabase";
import { Button, useDisclosure } from "@nextui-org/react";
import { ConciergeBell } from "lucide-react";
import React, { useEffect, useState } from "react";

const CallWaiterButton = ({ orderData }) => {
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
    const message = `Please call the waiter for table number: ${orderData?.table_id?.table_no}`;

    const { data, error } = await supabase
      .from("messages")
      .insert({
        table_id: orderData?.table_id?.id,
        restaurant_id: orderData?.restaurant_id?.id,
        message: message,
      })
      .select();
    if (error) {
      return console.error(error);
    } else {
      onWaiterOpen();
      setIsCalling(true);
      setCountdown(120);
    }
  };
  return (
    <section id="call_waiter_section">
      <div className="w-full fixed bottom-0 px-5 py-5 backdrop-blur-xl shadow-small rounded-t-large">
        <Button
          onPress={handleCallWaiter}
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
      <CallWaiter isOpen={isWaiterOpen} onOpenChange={onWaiterOpenChange} />
    </section>
  );
};

export default CallWaiterButton;
