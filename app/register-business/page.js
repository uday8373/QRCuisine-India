"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useLoadScript } from "@react-google-maps/api";
import supabase from "@/config/supabase";
import Image from "next/image";

// Define the libraries array outside of the component
const libraries = ["places"];

export default function RegisterBusiness() {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      specialty: "",
      tables: "",
      ownerName: "",
      contact: "",
      heardFrom: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Restaurant name is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
      specialty: Yup.string().required("Specialty is required"),
      tables: Yup.number()
        .required("Number of tables is required")
        .min(1, "At least 1 table is required")
        .max(99, "Maximum 2 digits allowed for tables"),
      ownerName: Yup.string().required("Owner name is required"),
      contact: Yup.string()
        .required("Owner contact is required")
        .matches(/^[0-9]{10}$/, "Contact must be exactly 10 digits"),
      heardFrom: Yup.string().required(
        "Please let us know how you heard about us"
      ),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const { data, error } = await supabase
          .from("enquiry") // Replace with your table name
          .insert([values]); // Inserting form values into the table

        if (error) {
          console.error("Error submitting data:", error.message);
          setSubmissionMessage("Failed to submit the form. Please try again.");
        } else {
          console.log("Form data submitted:", data);
          resetForm();
          setSubmissionMessage(
            "Thank you for submitting your information, we will contact you soon."
          );
          setTimeout(() => {
            setSubmissionMessage("");
          }, 5000);
        }
      } catch (error) {
        console.error("Unexpected error submitting data:", error);
        setSubmissionMessage(
          "Failed to submit the form due to an unexpected error."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const WhereYouHeard = [
    { key: "Social_Media", label: "Social Media" },
    { key: "Friend_And_Family", label: "Friend And Family" },
    { key: "Search_Engine", label: "Search Engine" },
    { key: "Other", label: "Other" },
  ];

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_URL, // Use environment variable for key
    libraries, // Use the pre-defined libraries array
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (!isLoaded || loadError) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ["address_components", "geometry"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.log("No details available for input: " + place.name);
        return;
      }

      const addressComponents = place.address_components;
      const address = formatAddress(addressComponents);
      const city = getCity(addressComponents);
      const state = getState(addressComponents);
      const country = getCountry(addressComponents);

      formik.setFieldValue("address", address);
      formik.setFieldValue("city", city);
      formik.setFieldValue("state", state);
      formik.setFieldValue("country", country);
    });
  }, [isLoaded, loadError, formik]);

  const formatAddress = (components) => {
    return components
      ? components.map((comp) => comp.long_name).join(", ")
      : "";
  };

  const getCity = (components) => {
    const cityComponent = components.find((comp) =>
      comp.types.includes("locality")
    );
    return cityComponent ? cityComponent.long_name : "";
  };

  const getState = (components) => {
    const stateComponent = components.find((comp) =>
      comp.types.includes("administrative_area_level_1")
    );
    return stateComponent ? stateComponent.long_name : "";
  };

  const getCountry = (components) => {
    const countryComponent = components.find((comp) =>
      comp.types.includes("country")
    );
    return countryComponent ? countryComponent.long_name : "";
  };

  return (
    <main className="flex items-center justify-center w-full bg-red">
      <div
        className="w-full relative rounded-lg px-5 mt-10  mb-10
       lg:mb-20  flex items-center justify-center lg:items-start  gap-10  max-w-screen-xl"
      >
        <div className="bg-white rounded-2xl  shadow-xl  p-10 w-full  h-full max-w-xl ">
          <form onSubmit={formik.handleSubmit} className=" ">
            <h2 className="text-2xl text-justify leading-tight font-bold mb-5 font-Rethink">
              Submit this form & Book your free demo today! Get 6 months free
              trial for first 50 restaurants. Hurry !
            </h2>

            {/* Name */}
            <div className="mb-4 flex flex-col lg:flex-row gap-4">
              <div className="mb-4">
                <Input
                  type="text"
                  label="Name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.name && !!formik.errors.name}
                  errorMessage={formik.errors.name}
                  variant="faded"
                  value={formik.values.name}
                  placeholder="Enter restaurant name"
                  fullWidth
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <Input
                  type="text"
                  label="Address"
                  name="address"
                  variant="faded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.address && !!formik.errors.address}
                  errorMessage={formik.errors.address}
                  value={formik.values.address}
                  placeholder="Enter address"
                  fullWidth
                  ref={inputRef} // Attach inputRef to address input
                />
              </div>
            </div>

            {/* City */}
            <div className="mb-4 flex flex-col lg:flex-row gap-4">
              <div className="mb-4">
                <Input
                  type="text"
                  label="City"
                  name="city"
                  variant="faded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.city && !!formik.errors.city}
                  errorMessage={formik.errors.city}
                  value={formik.values.city}
                  placeholder="Enter city"
                  fullWidth
                />
              </div>

              {/* State */}
              <div className="mb-4">
                <Input
                  type="text"
                  label="State"
                  variant="faded"
                  name="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.state && !!formik.errors.state}
                  errorMessage={formik.errors.state}
                  value={formik.values.state}
                  placeholder="Enter state"
                  fullWidth
                />
              </div>
            </div>

            <div className="mb-4 flex flex-col lg:flex-row gap-4">
              {/* Country */}
              <div className="mb-4">
                <Input
                  type="text"
                  label="Country"
                  name="country"
                  variant="faded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.country && !!formik.errors.country}
                  errorMessage={formik.errors.country}
                  value={formik.values.country}
                  placeholder="Enter country"
                  fullWidth
                />
              </div>

              {/* Specialty */}
              <div className="mb-4">
                <Input
                  type="text"
                  label="Specialty"
                  variant="faded"
                  name="specialty"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.specialty && !!formik.errors.specialty
                  }
                  errorMessage={formik.errors.specialty}
                  value={formik.values.specialty}
                  placeholder="Enter specialty"
                  fullWidth
                />
              </div>
            </div>

            <div className="mb-4 flex flex-col lg:flex-row gap-4">
              {/* Tables */}
              <div className="mb-4">
                <Input
                  type="number"
                  label="Tables"
                  variant="faded"
                  name="tables"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.tables && !!formik.errors.tables}
                  errorMessage={formik.errors.tables}
                  value={formik.values.tables}
                  placeholder="Enter number of tables"
                  fullWidth
                />
              </div>

              {/* Owner Name */}
              <div className="mb-4">
                <Input
                  type="text"
                  label="Owner Name"
                  name="ownerName"
                  variant="faded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.ownerName && !!formik.errors.ownerName
                  }
                  errorMessage={formik.errors.ownerName}
                  value={formik.values.ownerName}
                  placeholder="Enter owner name"
                  fullWidth
                />
              </div>
            </div>

            <div className="mb-4 flex flex-col lg:flex-row gap-4">
              {/* Contact */}
              <div className="mb-4 lg:w-1/2">
                <Input
                  type="text"
                  label="Contact"
                  name="contact"
                  variant={"faded"}
                  maxLength={10}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contact}
                  isInvalid={
                    formik.touched.contact && formik.errors.contact
                      ? true
                      : false
                  }
                  placeholder="Enter owner contact"
                  fullWidth
                  errorMessage={formik.errors.contact}
                />
              </div>

              {/* How heard */}
              <div className="mb-4 lg:w-1/2">
                <Select
                  items={WhereYouHeard}
                  label="Where you heard of Table QR?"
                  name="heardFrom"
                  variant="faded"
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  value={formik?.values.heardFrom}
                  errorMessage={formik.errors.heardFrom}
                  isInvalid={
                    formik.touched.heardFrom && formik.errors.heardFrom
                      ? true
                      : false
                  }
                  placeholder="Select an option"
                  className="w-full"
                >
                  {(WhereYouHeard) => (
                    <SelectItem>{WhereYouHeard.label}</SelectItem>
                  )}
                </Select>
              </div>
            </div>

            <div className="w-full pt-5">
              <Button
                size="lg"
                color="warning"
                type="submit"
                radius="full"
                disabled={formik.isSubmitting}
                className=" w-full text-lg text-white font-medium"
              >
                {formik.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
            {submissionMessage && (
              <div className="mt-5 w-full flex justify-center items-center">
                <p className="font-Rethink font-medium text-success text-lg text-center">
                  {submissionMessage}
                </p>
              </div>
            )}
          </form>
        </div>
        <div className=" hidden lg:block w-full rounded-xl   ">
          <div className="  flex  flex-col gap-12 justify-between w-full h-full">
            <div className="flex items-center  justify-center gap-5 pt-16 flex-col w-full">
              <p className="md:text-xl text-md text-white font-semibold">
                Book Free Demo Today
              </p>
              <h2 className="xl:text-6xl lg:text-5xl  font-bold font-Rethink text-center text-white  lg:leading-tight xl:leading-tight ">
                Smart Table <br />
                Ordering
              </h2>
            </div>
            <div className="w-full  flex justify-center items-center   ">
              <Image
                width={400}
                height={400}
                className="w-96 h-96 object-cover   "
                src="/assets/QRScan.png"
                alt="QRScan"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
