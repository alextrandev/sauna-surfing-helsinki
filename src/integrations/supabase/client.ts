// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://ftldxdsvwjkepkvafblv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0bGR4ZHN2d2prZXBrdmFmYmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxOTc3NjIsImV4cCI6MjA0Nzc3Mzc2Mn0.8D9AWF1B8fvXG1LmLdyfG9oLuhbLn1xLL6GnJtJ4NyU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);