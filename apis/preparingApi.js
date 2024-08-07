import supabase from "@/config/supabase";

export const fetchOrderData = async (orderId) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `*,table_id: tables(*), waiters: waiter_id(*), restaurant_id: restaurants(*), status_id: status_table(*)`
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
