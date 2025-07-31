import { createClient } from "@supabase/supabase-js";

const URL = "https://odjjduughidqyhxinykv.supabase.co";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kampkdXVnaGlkcXloeGlueWt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NTU2NjIsImV4cCI6MjA2OTUzMTY2Mn0.0Qx2L4meYT7tPXzldx2BS7khHCxyqdktUZxGVbjaRNs";

export const supabase = createClient(URL, API_KEY);