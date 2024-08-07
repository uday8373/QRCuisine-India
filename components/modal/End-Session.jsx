"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";
import supabase from "@/config/supabase";
import { LogoutLogo } from "../icons/logout";

const EndSession = ({ isOpen, onOpenChange, tableId }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const { data, error } = await supabase
      .from("tables")
      .update({ is_booked: false, persons: null })
      .eq("id", tableId)
      .select();
    if (error) {
      throw error;
    } else {
      localStorage.clear();
      router.replace("/");
    }
  };
  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Close Session</ModalHeader>
            <ModalBody>
              <div className="flex flex-col justify-center items-center">
                <LogoutLogo size={170} className="-mt-3" />
                <p className="text-center font-medium text-medium">
                  Are you sure, you want to end this booking?
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={handleLogout}>
                Close Now
              </Button>
              <Button color="primary" onPress={onClose}>
                Continue Booking
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EndSession;
