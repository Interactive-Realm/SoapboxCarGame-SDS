import React, { useContext, useEffect, useState } from "react";
import dbUtility from "../Database/dbUtility";
import { UserContext } from "../../UserContext";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { UserHighscoreNumber } from "../types";

type Props = {
    onSignUp: () => void;
    score: number;
};
  
const Input = ({ onSignUp, score }: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserHighscoreNumber>();
    const userInfo = useContext(UserContext)
    

    //var [score, setScore] = useState<number>();
    const onSubmit = async (values: UserHighscoreNumber) => {
        console.log(errors.phonenumber?.message)

        try {
            const { data, error } = await dbUtility.CheckUserData(
                values.phonenumber,
                "sdsusers"
            );
            console.log(data);

            if (error) return;
            

            else if (!data) {
                userInfo.userInfo = values.phonenumber
                localStorage.setItem('userinfo', JSON.stringify(userInfo.userInfo));

                await dbUtility.insertUserData(values.first_name, userInfo.userInfo, score);
                onSignUp();
                
                console.log("Data submitted successfully!");
                 
            } else if (data){
                
                userInfo.userInfo = values.phonenumber
                localStorage.setItem('userinfo', JSON.stringify(userInfo.userInfo));
                await dbUtility.UpdateScore(values.phonenumber, score)
                onSignUp();
            }

            // Call insertUserData function from dbUtility to insert user data

            // Optionally, you can perform additional actions after successful submission
           
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div id="inputform">
            <h2 id="subtitle2"> SIGN UP</h2>
            <p id="inputformtext"> We'll remember you, the next time you play</p>
            <div>
            <img src="/assets/Group44.png" alt="IS Logo" className='fp-car-picture'></img>
            </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name" >
                   Display Name
                </label>
                <p id="formtext">
                    This will be visible on the Leaderboard
                </p>
                <input {...register("first_name", {pattern: /^[A-Za-z]{3,15}$/i})} />
                {errors.first_name && (
                <p id="highscore_element">You must submit a valid name </p>
                )}
    
                <label htmlFor="e-mail">
                    Phone Number
                </label>

          
                <input {...register("phonenumber", {pattern: /^\b[0-9]{8}\b/})} />
                {errors.phonenumber && (
                <p id="highscore_element">You Must submit a Danish phone number</p>
                )}

                <p id="tos">

                By signing up, you consent to Interactive Realm temporarily storing your display name and phonenumber for up to 24 hours. 
                We do not collect or store this data beyond the specified time, nor will we hand over this data to any third party.

                </p>
    
                <input type="submit" value="Proceed" className="buttonwhitesmall"/>
            </form>   
            </div>            
    );
};

export default Input;
