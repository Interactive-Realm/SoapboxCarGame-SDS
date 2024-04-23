import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserHighscore } from "../types";

class DBUtility {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
        'https://sdauykhinqbirdyribze.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkYXV5a2hpbnFiaXJkeXJpYnplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzUxMDMsImV4cCI6MjAyODI1MTEwM30.KufCiKTxINMkLWYftGdCKvFJFI82O4TBspg1Tne9I5E'
    );
  }

  async insertUserData(name: string, email: string, score: number): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('sdsusers') // Replace 'users' with your table name
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

  // Check if user exists in given database
  async CheckUserData(email: string, table: string): Promise<any> {
    const { data, error } = await this.supabase.rpc("check_email", {
          email_to_check: email,
          table_to_check: table,
      });
      // console.log(data);
      if (error) {
        console.error(error);
      }

      return {data, error};
  }

  async GetHighscore(): Promise<UserHighscore[]> {
    const { data, error } = await this.supabase
        .from("sdsusers")
        .select("name, email, score")
        .order("score", { ascending: false });

    if (error) {
        throw new Error(error.message); // Handle error appropriately
    }

    return data || []; // Return an empty array if data is null
}
}

export default new DBUtility();
