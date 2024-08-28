import {
  insertMessage,
  insertUser,
  updateTable,
  updateVisitorBooked,
} from "@/apis/restaurantApi";
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
import { Loader } from "lucide-react";
import React, { useState } from "react";

const BookTable = ({
  isOpen,
  onOpenChange,
  tableId,
  setIsBooked,
  restaurantId,
  tableNo,
}) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const persons = [
    { key: 1, label: "01" },
    { key: 2, label: "02" },
    { key: 3, label: "03" },
    { key: 4, label: "04" },
    { key: 5, label: "05" },
    { key: 6, label: "06" },
  ];

  const handleBookTable = async () => {
    setIsLoading(true);
    try {
      const insertUserResponse = await insertUser(tableId, restaurantId);
      if (!insertUserResponse || insertUserResponse.length === 0) {
        throw new Error("User insertion failed");
      }

      const userId = insertUserResponse[0].id;
      const deviceToken = insertUserResponse[0].deviceToken;

      const [updateTableResponse, updateVisitorResponse, messageResponse] =
        await Promise.all([
          updateTable(tableId, selectedPerson),
          updateVisitorBooked(restaurantId),
          insertMessage(tableId, restaurantId, userId, tableNo),
        ]);

      if (updateTableResponse && updateVisitorResponse && messageResponse) {
        setIsBooked(true);
        localStorage.setItem("isBooked", true);
        localStorage.setItem("tableId", tableId);
        localStorage.setItem("deviceToken", deviceToken);
        localStorage.setItem("userId", userId);
      }
    } catch (error) {
      console.error("Error booking table or updating visitor:", error);
    } finally {
      setIsLoading(false);
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
                spinner={<Loader size={20} className="animate-spin" />}
                isLoading={isLoading}
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
