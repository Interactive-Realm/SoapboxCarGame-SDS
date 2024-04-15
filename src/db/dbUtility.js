import { createClient } from '@supabase/supabase-js';

class DBUtility {
  constructor() {
    this.supabase = createClient(
        'https://plmkjwqkelfhsrzyfmmp.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbWtqd3FrZWxmaHNyenlmbW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NjM5MTAsImV4cCI6MjAyNTIzOTkxMH0.tj4YtY6aPqk5tKdMWaUDgHC0MzrN99PxMOPX38UxK2w'
    );
  }

  async insertUserData(firstname,  email ) {
    try {
      const { data, error } = await this.supabase
        .from('users') // Replace 'users' with your table name
        .insert([{ firstname,  email}]);
      
      if (error) {
        console.error('Error inserting data:', error);
        console.error('Server response:', error.response);
      } else {
        console.log('Data inserted successfully:', data);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  // Add other database operations as needed
  async CheckUserData(email) {
      const { data, error } = await this.supabase.rpc('check_email', { email_to_check: email })
      // console.log(data);
      if (error) console.error(error)

      return data;      
  }
}

export default new DBUtility();
