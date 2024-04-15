import { createClient, SupabaseClient } from '@supabase/supabase-js';

class DBUtility {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
        'https://dmigsdtcgybqkeizrwnc.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtaWdzZHRjZ3licWtlaXpyd25jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyNTM2OTAsImV4cCI6MjAxNjgyOTY5MH0.Vo0gwyHKGlAmCeu7DAHue-KI2Rt1HgZ7dp85jhE3NPY'
    );
  }

  async insertUserData(name: string, email: string, score: number): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('users') // Replace 'users' with your table name
        .insert([{ name, email, score }]); // Has to match the database column names
      
      if (error) {
        console.error('Error inserting data:', error);
        console.error('Server response:', error.details);
      } else {
        console.log('Data inserted successfully:', data);
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
  }

  // Add other database operations as needed
  async CheckUserData(email: string): Promise<any> {
      const { data, error } = await this.supabase.rpc('check_email', { email_to_check: email });
      // console.log(data);
      if (error) console.error(error);

      return data;      
  }
}

export default new DBUtility();
