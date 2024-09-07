import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://guvhwgqilmxiddtpepqk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1dmh3Z3FpbG14aWRkdHBlcHFrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODMwMDc1NSwiZXhwIjoyMDMzODc2NzU1fQ.Sq4QxYr4k0kYnaCfV5R734cAatA0HTBATnepzJHs_bI";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
