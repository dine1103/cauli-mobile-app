import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from './database.types';

const supabaseUrl = 'https://ggbsoaygnwoplxqitvbu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnYnNvYXlnbndvcGx4cWl0dmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczODYwMjcsImV4cCI6MjA3Mjk2MjAyN30.kVyT2Lx2TwmBzABLyIr2Sjj4Vz5gKw2HO3a4wcCN8Ew';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
