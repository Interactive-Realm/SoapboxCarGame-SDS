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

            if (error) return;

            else if (!data) {
                await dbUtility.insertUserData(values.first_name, values.phonenumber, score);
                onSignUp();
                userInfo.userInfo = values.phonenumber
                console.log("Data submitted successfully!");
            } else{
                await dbUtility.UpdateScore(values.phonenumber, score)
            }

            // Call insertUserData function from dbUtility to insert user data

            // Optionally, you can perform additional actions after successful submission
           
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
                <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name" className="text">
                   First Name
                </label>
                <br>
                </br>
                <input {...register("first_name", {pattern: /^[A-Za-z]+$/i})} />
                {errors.first_name && (
                <p>You must submit a valid name </p>
                )}
                <br></br>
    
                <label htmlFor="e-mail" className="text">
                    Phone Number
                </label>
                <input {...register("phonenumber", {pattern: /^\b[0-9]{8}\b/})} />
                {errors.phonenumber && (
                <p>You Must submit a Danish phone number</p>
                )}
    
                <input type="submit" value="Tilmeld" />
            </form>               
    );
};

export default Input;
