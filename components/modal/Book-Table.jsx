import supabase from "@/config/supabase";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useState } from "react";

const BookTable = ({ isOpen, onOpenChange, tableId, setIsBooked }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const persons = [
    { key: 1, label: "01" },
    { key: 2, label: "02" },
    { key: 3, label: "03" },
    { key: 4, label: "04" },
    { key: 5, label: "05" },
    { key: 6, label: "06" },
  ];

  const handleBookTable = async () => {
    const { data, error } = await supabase
      .from("tables")
      .update({ is_booked: true, persons: selectedPerson })
      .eq("id", tableId)
      .select();
    if (error) {
      throw error;
    } else {
      setIsBooked(true);
      localStorage.setItem("isBooked", true);
      localStorage.setItem("tableId", tableId);
    }
  };

  return (
    <Modal
      isKeyboardDismissDisabled
      defaultOpen
      hideCloseButton
      isDismissable
      backdrop="blur"
      size="xs"
      placement="center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Booked this table
            </ModalHeader>
            <ModalBody className="pt-0">
              <Select
                onSelectionChange={(key) => {
                  setSelectedPerson(key.currentKey);
                }}
                label="Select number of persons"
              >
                {persons.map((person) => (
                  <SelectItem key={person.key}>{person.label}</SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button
                isDisabled={!selectedPerson}
                onClick={handleBookTable}
                size="lg"
                fullWidth
                color="primary"
                onPress={onClose}
              >
                Book Now
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookTable;
