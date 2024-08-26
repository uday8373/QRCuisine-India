import supabase from "@/config/supabase";
import moment from "moment/moment";

export const fetchTableData = async (tableNo) => {
  try {
    const { data, error } = await supabase
      .from("tables")
      .select("*")
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
      .select("*")
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
      .select("*")
      .eq("restaurant_id", restaurantId);

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
      .select("*", { count: "exact" })
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
      .select("*", { count: "exact" })
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
      .select("*")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", todayString)
      .lt("created_at", tomorrowString)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    let websiteVisitCount = 1;
    let upsertData;

    if (existingRecord) {
      websiteVisitCount = parseInt(existingRecord.website_visit, 10) + 1;
      upsertData = { id: existingRecord.id, website_visit: websiteVisitCount };
    } else {
      upsertData = {
        restaurant_id: restaurantId,
        website_visit: websiteVisitCount,
      };
    }

    const { data, error: upsertError } = await supabase
      .from("visitors")
      .upsert(upsertData, { onConflict: ["id"] })
      .select();

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
      .select("*")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", todayString)
      .lt("created_at", tomorrowString)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    let count = 1;
    let upsertData;

    if (existingRecord) {
      count = parseInt(existingRecord.booked_count, 10) + 1;
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
      .select();

    if (upsertError) throw upsertError;

    return data;
  } catch (error) {
    console.error("Error updating visitors:", error);
    return null;
  }
};
