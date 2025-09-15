// Test Supabase connection
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ggbsoaygnwoplxqitvbu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnYnNvYXlnbndvcGx4cWl0dmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczODYwMjcsImV4cCI6MjA3Mjk2MjAyN30.kVyT2Lx2TwmBzABLyIr2Sjj4Vz5gKw2HO3a4wcCN8Ew';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test signup
    const { data, error } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: '123456',
      options: {
        data: {
          full_name: 'Test User',
        },
      },
    });

    console.log('Signup result:');
    console.log('Data:', data);
    console.log('Error:', error);
    
    if (error) {
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        statusText: error.statusText,
        name: error.name
      });
    }
    
  } catch (err) {
    console.error('Catch error:', err);
  }
}

testSupabase();
