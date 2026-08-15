import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fjxmazopukjqlsxtjmze.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqeG1hem9wdWtqcWxzeHRqbXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MTE4MTIsImV4cCI6MjEwMjM4NzgxMn0.79kOjoHuffMaygZ0oGYXy6sJCMoEBQ1Rw2vlko8iAIg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
