"use client";
import {
  fetchCategoriesData,
  fetchIsBooked,
  fetchRestaurantData,
  fetchRestaurantMenuData,
  fetchSpecialMenuData,
  fetchTableData,
} from "@/apis/restaurantApi";
import ScreenError from "@/components/pages/Screen-Error";
import useSmallScreen from "@/hooks/useSmallScreen";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Hero from "./Hero";
import { Button, Spinner, table, useDisclosure } from "@nextui-org/react";
import { notFound } from "next/navigation";
import BookTable from "@/components/modal/Book-Table";
import SpecialMenu from "./Special-Menu";
import CartPopup from "@/components/elements/Cart-Popup";
import FoodMenu from "./Food-Menu";
import useStatusNavigate from "@/hooks/useStatusRedirect";
import SadIcon from "@/components/icons/sad";
import { ArrowLeftFromLine } from "lucide-react";
import supabase from "@/config/supabase";

const RestuarantMainPage = ({ restaurantId, tableId }) => {
  const router = useRouter();
  const navigateBasedOnStatus = useStatusNavigate();
  const restaurantName = decodeURIComponent(restaurantId);
  const storedCartItems =
    typeof window !== "undefined" ? localStorage.getItem("cartItems") : null;
  const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
  const isSmallScreen = useSmallScreen();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const [notFoundError, setNotFoundError] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [specialMenuData, setSpecialMenuData] = useState([]);
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [menuItems, setMenuItems] = useState([]);
  const [maxItems, setMaxItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dataLoading, setDataLoading] = useState(true);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [selfBooked, setSelfBooked] = useState(false);

  const pageSize = 10;

  const customerStatus =
    typeof window !== "undefined" ? localStorage.getItem("status") : null;

  if (customerStatus) {
    navigateBasedOnStatus();
  }

  const localTableId =
    typeof window !== "undefined" ? localStorage.getItem("tableId") : null;

  useEffect(() => {
    if (isBooked && tableId !== localTableId) {
      setSelfBooked(true);
    }
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const [tableResponse, restaurantResponse, isBookedResponse] =
          await Promise.all([
            fetchTableData(tableId),
            fetchRestaurantData(restaurantName),
            fetchIsBooked(),
          ]);
        if (!tableResponse || !restaurantResponse) {
          setNotFoundError(true);
        }
        if (
          tableResponse.is_booked === true &&
          localTableId !== tableResponse.id
        ) {
          setAlreadyBooked(true);
        }
        setTableData(tableResponse);
        setRestaurantData(restaurantResponse);
        setIsBooked(isBookedResponse);

        const [categoryResponse, specialMenuResponse, menuResponse] =
          await Promise.all([
            fetchCategoriesData(restaurantResponse.id),
            fetchSpecialMenuData(restaurantResponse.id, pageSize),
            fetchRestaurantMenuData(
              restaurantResponse.id,
              currentPage,
              selectedCategory,
              pageSize
            ),
          ]);
        setCategoryData(categoryResponse);
        setSpecialMenuData(specialMenuResponse.data);
        setMenuItems((prevItems) =>
          currentPage === 1
            ? menuResponse.data
            : [...prevItems, ...menuResponse.data]
        );
        setMaxItems(menuResponse.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
        setDataLoading(false);
      }
    };
    fetchData();
  }, [
    tableId,
    restaurantName,
    currentPage,
    selectedCategory,
    pageSize,
    localTableId,
    isBooked,
  ]);

  const handleCartChange = (menuItem, quantity) => {
    setCartItems((prevCartItems) => {
      const itemIndex = prevCartItems.findIndex(
        (item) => item.id === menuItem.id
      );
      let updatedCartItems;

      if (itemIndex !== -1) {
        updatedCartItems = [...prevCartItems];
        updatedCartItems[itemIndex].quantity = quantity;
        updatedCartItems = updatedCartItems.filter((item) => item.quantity > 0);
      } else {
        updatedCartItems = [...prevCartItems, { ...menuItem, quantity }];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("tableData", JSON.stringify(tableData));
    localStorage.setItem("restaurantData", JSON.stringify(restaurantData));
    localStorage.setItem("status", "checkout");
    router.push("/checkout");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

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

  if (!isSmallScreen) {
    return <ScreenError />;
  }
  if (notFoundError) {
    return notFound();
  }
  if (isLoading) {
    return (
      <div className="w-full h-svh flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (alreadyBooked) {
    return (
      <div className="w-full h-svh flex justify-center items-center flex-col gap-8">
        <SadIcon size={150} />
        <h2 className="text-center text-default-700">
          This table is already booked.
          <br /> Please try booking a different table.
        </h2>
        <Button
          onClick={() => router.replace("/")}
          color="primary"
          startContent={<ArrowLeftFromLine size={20} />}
        >
          Back to Home
        </Button>
      </div>
    );
  }
  if (selfBooked) {
    return (
      <div className="w-full h-svh flex justify-center items-center flex-col gap-8 px-5">
        <SadIcon size={150} />
        <h2 className="text-center text-default-700">
          {`You have already booked a table.`}
          <br /> Would you like to keep this reservation?
        </h2>
        <div className="w-full flex justify-between items-center">
          <Button onClick={handleLogout} color="danger" variant="light">
            Close Now
          </Button>
          <Button
            onClick={() =>
              router.replace(
                `/${restaurantData.restaurant_name}/${localTableId}`
              )
            }
            color="success"
          >
            Continue Reservation
          </Button>
        </div>
      </div>
    );
  }
  return (
    <>
      <Hero tableData={tableData} restaurantData={restaurantData} />
      <SpecialMenu
        specialMenuData={specialMenuData}
        onCartChange={handleCartChange}
        cartItems={cartItems}
      />
      <FoodMenu
        categoryData={categoryData}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        menuItems={menuItems}
        onCartChange={handleCartChange}
        cartItems={cartItems}
        maxItems={maxItems}
        onLoadMore={handleLoadMore}
        dataLoading={dataLoading}
      />
      {!isBooked && (
        <BookTable
          isOpen={!isBooked}
          onOpenChange={onOpenChange}
          setIsBooked={setIsBooked}
          tableId={tableId}
        />
      )}
      {cartItems.length !== 0 && (
        <CartPopup
          totalPrice={totalPrice}
          totalQuantity={totalQuantity}
          handleCheckout={handleCheckout}
        />
      )}
    </>
  );
};

export default RestuarantMainPage;
