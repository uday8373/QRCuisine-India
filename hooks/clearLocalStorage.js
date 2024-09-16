export const clearLocalStorage = async () => {
  const keysToRemove = [
    "isBooked",
    "tableId",
    "userId",
    "cartItems",
    "tableData",
    "restaurantData",
    "status",
    "orderId",
    "isRated",
    "instructions",
  ];

  keysToRemove.forEach((key) => localStorage.removeItem(key));
};
