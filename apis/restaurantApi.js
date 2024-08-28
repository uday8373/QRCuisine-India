import supabase from "@/config/supabase";
import UAParser from "ua-parser-js";

export const fetchTableData = async (tableNo) => {
  try {
    const { data, error } = await supabase
      .from("tables")
      .select("id, table_no, is_booked, is_available")
      .eq("id", tableNo)
      .single();

    if (error) throw error;
    return data ? data : null;
  } catch (error) {
    console.error("Error fetching table data:", error);
    return null;
  }
};

export const fetchRestaurantData = async (restaurantName) => {
  try {
    const { data, error } = await supabase
      .from("restaurants")
      .select("id, restaurant_name, background_image, logo, gst_percentage")
      .eq("restaurant_name", restaurantName)
      .single();

    if (error) throw error;
    return data ? data : null;
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    return null;
  }
};

export const fetchIsBooked = async () => {
  const isBooked = localStorage.getItem("isBooked");
  if (isBooked) return true;
  else return null;
};

export const fetchCategoriesData = async (restaurantId) => {
  try {
    const { data, error } = await supabase
      .from("menu_category")
      .select("id, category_name")
      .eq("restaurant_id", restaurantId)
      .eq("status", true);

    if (error) throw error;
    return data ? data : null;
  } catch (error) {
    console.error("Error fetching categories data:", error);
    return [];
  }
};

export const fetchSpecialMenuData = async (restaurantId, pageSize) => {
  try {
    const { data, count, error } = await supabase
      .from("food_menus")
      .select(
        "id, image, food_name, price, quantity, category, is_veg, isSpecial, is_available, created_at",
        { count: "exact" }
      )
      .eq("restaurant_id", restaurantId)
      .eq("isSpecial", true)
      .eq("is_available", true)
      .limit(pageSize);

    if (error) {
      throw error;
    }
    if (data) {
      return { data, count };
    }
  } catch (error) {
    console.error("Error fetching restaurant menu data:", error);
    return { data: [], count: 0 };
  }
};

export const fetchRestaurantMenuData = async (
  restaurantId,
  page,
  selectedCategory,
  pageSize
) => {
  try {
    let query = supabase
      .from("food_menus")
      .select(
        "id, image, food_name, price, quantity, category, is_veg, isSpecial, is_available, created_at",
        { count: "exact" }
      )
      .eq("restaurant_id", restaurantId)
      .order("is_available", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1)
      .limit(pageSize);

    if (selectedCategory !== "all") {
      query = query.eq("category", selectedCategory);
    }

    const { data, count, error } = await query;
    if (error) throw error;
    return { data, count };
  } catch (error) {
    console.error("Error fetching restaurant menu data:", error);
    return { data: [], count: 0 };
  }
};

export const updateVisitors = async (restaurantId) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayString = today.toISOString().split("T")[0];
    const tomorrowString = tomorrow.toISOString().split("T")[0];

    const { data: existingRecord, error: fetchError } = await supabase
      .from("visitors")
      .select("id, website_visit")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", todayString)
      .lt("created_at", tomorrowString)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;
    let count = 1;
    let upsertData;

    if (existingRecord) {
      count = parseInt(existingRecord.website_visit) + 1;
      upsertData = { id: existingRecord.id, website_visit: count };
    } else {
      upsertData = {
        restaurant_id: restaurantId,
        website_visit: count,
      };
    }

    const { data, error: upsertError } = await supabase
      .from("visitors")
      .upsert(upsertData, { onConflict: ["id"] })
      .select("id");

    if (upsertError) throw upsertError;

    return data;
  } catch (error) {
    console.error("Error updating visitors:", error);
    return null;
  }
};

export const updateVisitorBooked = async (restaurantId) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayString = today.toISOString().split("T")[0];
    const tomorrowString = tomorrow.toISOString().split("T")[0];

    const { data: existingRecord, error: fetchError } = await supabase
      .from("visitors")
      .select("id, booked_count")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", todayString)
      .lt("created_at", tomorrowString)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    let count = 1;
    let upsertData;

    if (existingRecord) {
      count = parseInt(existingRecord.booked_count) + 1;
      upsertData = { id: existingRecord.id, booked_count: count };
    } else {
      upsertData = {
        restaurant_id: restaurantId,
        booked_count: count,
      };
    }

    const { data, error: upsertError } = await supabase
      .from("visitors")
      .upsert(upsertData, { onConflict: ["id"] })
      .select("id");

    if (upsertError) throw upsertError;

    return data;
  } catch (error) {
    console.error("Error updating visitors:", error);
    return null;
  }
};

export const updateTable = async (tableId, selectedPerson) => {
  try {
    const { data, error } = await supabase
      .from("tables")
      .update({ is_booked: true, persons: selectedPerson })
      .eq("id", tableId)
      .select("id");

    if (error) {
      throw error;
    }
    if (data) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export const insertUser = async (tableId, restaurantId) => {
  let uniqueDeviceToken = localStorage.getItem("deviceToken");

  if (!uniqueDeviceToken) {
    const parser = new UAParser();
    const result = parser.getResult();
    const osName = result.os.name || "UnknownOS";
    const deviceName = result.device.model || "UnknownDevice";
    const browserName = result.browser.name || "UnknownBrowser";
    const uniqueId = Math.floor(100000 + Math.random() * 900000);
    uniqueDeviceToken =
      `${osName}_${deviceName}_${browserName}_${uniqueId}`.replace(/ /g, "_");
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name: "Anonymous",
          mobile: null,
          table_id: tableId,
          restaurant_id: restaurantId,
          is_active: true,
          deviceToken: uniqueDeviceToken,
        },
      ])
      .select("id, deviceToken");

    if (error) {
      throw error;
    }
    if (data) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export const insertMessage = async (tableId, restaurantId, userId, tableNo) => {
  const message = `Table No. ${tableNo} has been successfully booked!`;
  const subMessage = "For more details, please visit the table list page.";
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          table_id: tableId,
          restaurant_id: restaurantId,
          user_id: userId,
          order_id: null,
          waiter_id: null,
          message: message,
          sub_message: subMessage,
          is_read: false,
        },
      ])
      .select("id");

    if (error) {
      throw error;
    }
    if (data) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateVisitorCheckout = async (restaurantId) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayString = today.toISOString().split("T")[0];
    const tomorrowString = tomorrow.toISOString().split("T")[0];

    const { data: existingRecord, error: fetchError } = await supabase
      .from("visitors")
      .select("id, checkout_count")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", todayString)
      .lt("created_at", tomorrowString)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    let count = 1;
    let upsertData;

    if (existingRecord) {
      count = parseInt(existingRecord.checkout_count) + 1;
      upsertData = { id: existingRecord.id, checkout_count: count };
    } else {
      upsertData = {
        restaurant_id: restaurantId,
        checkout_count: count,
      };
    }

    const { data, error: upsertError } = await supabase
      .from("visitors")
      .upsert(upsertData, { onConflict: ["id"] })
      .select("id");

    if (upsertError) throw upsertError;

    return data;
  } catch (error) {
    console.error("Error updating visitors:", error);
    return null;
  }
};
