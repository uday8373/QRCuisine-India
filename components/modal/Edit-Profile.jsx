import supabase from "@/config/supabase";
import { uploadImageToCloudinary } from "@/utils/uplaodCloudinary";
import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Loader, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";

const EditProfileModal = ({
  isOpen,
  onOpenChange,
  userData,
  fetchUserData,
}) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setImageUrl(userData.image || "");
    }
  }, [userData]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setUploading(true);
    try {
      let imageUrlToUpdate = imageUrl;
      if (imageUrl !== userData.image) {
        imageUrlToUpdate = await uploadImageToCloudinary(imageUrl);
      }
      const { data, error } = await supabase
        .from("verified_users")
        .update({
          name: name,
          image: imageUrlToUpdate,
        })
        .eq("id", userData.id)
        .select();

      if (error) {
        console.error("Error updating profile:", error);
      } else {
        await fetchUserData();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Edit Profile</ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center">
            {imageUrl ? (
              <Avatar
                htmlFor="picture"
                src={imageUrl}
                alt="Profile picture"
                className="w-24 h-24"
                size="lg"
                radius="full"
              />
            ) : (
              <label
                htmlFor="picture"
                className="w-24 h-24 cursor-pointer bg-default-100 rounded-full flex items-center justify-center border-dashed border-2 border-default-300"
              >
                <Upload className="h-6 w-6 text-default-500" />
              </label>
            )}
            <label
              htmlFor="picture"
              className="cursor-pointer flex items-center space-x-2 text-sm text-default-500 font-medium mb-5 mt-2"
            >
              <span>Upload new picture</span>
            </label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              variant="faded"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            spinner={<Loader size={20} className="animate-spin" />}
            isLoading={uploading}
            onClick={handleSave}
            fullWidth
            size="lg"
            color="primary"
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
