import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ChevronsRight } from "lucide-react";
import React from "react";

const AddDetails = ({
  isOpen,
  onOpenChange,
  personalDetails,
  handleNameChange,
  handleMobileChange,
  handleSubmit,
  nameError,
  mobileError,
}) => {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Personal Information
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                isRequired
                type="text"
                label="Name"
                placeholder="Enter your name"
                value={personalDetails.name}
                onChange={handleNameChange}
                errorMessage={nameError}
                validationState={nameError ? "invalid" : ""}
                maxLength={50}
              />
              <Input
                isRequired
                type="tel"
                label="Mobile Number"
                placeholder="Enter your mobile number"
                value={personalDetails.mobile}
                onChange={handleMobileChange}
                errorMessage={mobileError}
                validationState={mobileError ? "invalid" : ""}
                maxLength={10}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                endContent={<ChevronsRight size={18} />}
                fullWidth
                size="lg"
                color="primary"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Placed Order
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddDetails;
