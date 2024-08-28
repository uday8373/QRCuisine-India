import supabase from "@/config/supabase";

export const fetchOrderData = async (orderId) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `*,tables: table_id(id, table_no), waiters: waiter_id(id, name), restaurant_id: restaurants(id, restaurant_name, logo), status_id: status_table(id, title, description, sorting)`
      )
      .eq("id", orderId)
      .single();

    if (error) throw error;
    return data ? data : null;
  } catch (error) {
    console.error("Error fetching table data:", error);
    return null;
  }
};
export const fetchStatusData = async () => {
  try {
    const { data, error } = await supabase
      .from("status_table")
      .select("*")
      .order("sorting", { ascending: true });

    if (error) throw error;
    return data ? data : null;
  } catch (error) {
    console.error("Error fetching table data:", error);
    return null;
  }
};

export const updateVisitorConfirm = async (restaurantId) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayString = today.toISOString().split("T")[0];
    const tomorrowString = tomorrow.toISOString().split("T")[0];

    const { data: existingRecord, error: fetchError } = await supabase
      .from("visitors")
      .select("id, order_confirm_count")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", todayString)
      .lt("created_at", tomorrowString)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    let count = 1;
    let upsertData;

    if (existingRecord) {
      count = parseInt(existingRecord.order_confirm_count) + 1;
      upsertData = { id: existingRecord.id, order_confirm_count: count };
    } else {
      upsertData = {
        restaurant_id: restaurantId,
        order_confirm_count: count,
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

export const updateVisitorPreparing = async (restaurantId) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayString = today.toISOString().split("T")[0];
    const tomorrowString = tomorrow.toISOString().split("T")[0];

    const { data: existingRecord, error: fetchError } = await supabase
      .from("visitors")
      .select("id, order_preparing_count")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", todayString)
      .lt("created_at", tomorrowString)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    let count = 1;
    let upsertData;

    if (existingRecord) {
      count = parseInt(existingRecord.order_preparing_count) + 1;
      upsertData = { id: existingRecord.id, order_preparing_count: count };
    } else {
      upsertData = {
        restaurant_id: restaurantId,
        order_preparing_count: count,
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

export const updateVisitorDelivered = async (restaurantId) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayString = today.toISOString().split("T")[0];
    const tomorrowString = tomorrow.toISOString().split("T")[0];

    const { data: existingRecord, error: fetchError } = await supabase
      .from("visitors")
      .select("id, order_delivered_count")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", todayString)
      .lt("created_at", tomorrowString)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    let count = 1;
    let upsertData;

    if (existingRecord) {
      count = parseInt(existingRecord.order_delivered_count) + 1;
      upsertData = { id: existingRecord.id, order_delivered_count: count };
    } else {
      upsertData = {
        restaurant_id: restaurantId,
        order_delivered_count: count,
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
