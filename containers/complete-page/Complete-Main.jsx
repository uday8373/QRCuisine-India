"use client";
import Happy from "@/components/icons/happy";
import confetti from "canvas-confetti";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSmallScreen from "@/hooks/useSmallScreen";
import ScreenError from "@/components/pages/Screen-Error";
import { Button } from "@nextui-org/react";
import { ArrowLeftFromLine } from "lucide-react";

const CompleteMain = () => {
  const router = useRouter();
  const isSmallScreen = useSmallScreen();

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

  if (!isSmallScreen) {
    return <ScreenError />;
  }
  return (
    <section
      id="complete"
      className="w-full h-svh flex justify-center items-center px-5 flex-col gap-6"
    >
      <Happy size={175} />
      <h3 className="text-2xl font-medium text-primary text-center">
        Thank you for visiting us!
      </h3>
      <Button
        onClick={() => router.replace("/")}
        color="primary"
        startContent={<ArrowLeftFromLine size={20} />}
      >
        Back to Home
      </Button>
    </section>
  );
};

export default CompleteMain;
