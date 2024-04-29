import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { UserHighscore, UserHighscoreNumber, UserHighscoreShort } from "../types";

class DBUtility {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            "https://sdauykhinqbirdyribze.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkYXV5a2hpbnFiaXJkeXJpYnplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzUxMDMsImV4cCI6MjAyODI1MTEwM30.KufCiKTxINMkLWYftGdCKvFJFI82O4TBspg1Tne9I5E"
        );
    }

    async insertUserData(
        name: string,
        phonenumber: string,
        score: number
    ): Promise<void> {
        try {
            const { data, error } = await this.supabase
                .from("sdsusers") // Replace 'users' with your table name
                .insert([{ name, phonenumber, score }]); // Has to match the database column names

            if (error) {
                console.error("Error inserting data:", error);
                console.error("Server response:", error.details);
            } else {
                console.log("Data inserted successfully:", data);
            }
        } catch (error) {
            console.error("Error:", (error as Error).message);
        }
    }

    // Check if user exists in given database
    async CheckUserData(email: string, table: string): Promise<any> {
        const { data, error } = await this.supabase.rpc("check_phonenumber", {
            number_to_check: email,
            table_to_check: table,
        });
        // console.log(data);
        if (error) {
            console.error(error);
        }

        return { data, error };
    }

    async GetHighscore(): Promise<UserHighscoreNumber> {
        let { data, error } = await this.supabase
        .rpc('get_highscores', {
          limit_count: 10,
        })
      if (error) console.error(error)
      else console.log(data)
    return data;
    }

    async UpdateScore(number: string, score: integer): Promise<any> {
        let { data, error } = await this.supabase.rpc("update_score", {
            user_number: number,
            user_score: score,
        });
        if (error) console.error(error);
        else console.log(data);
        return data;
    }
}

export default new DBUtility();
