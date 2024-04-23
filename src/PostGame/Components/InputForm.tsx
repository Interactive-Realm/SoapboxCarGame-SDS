import React, { useState } from "react";
import dbUtility from "../Database/dbUtility";

type Props = {
    onSignUp: () => void;
    score: number;
};

const Input = ({ onSignUp, score }: Props) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    //var [score, setScore] = useState<number>();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const { data, error } = await dbUtility.CheckUserData(
                email,
                "sdsusers"
            );

            if (error) return;

            if (!data) {
                await dbUtility.insertUserData(fullname, email, score);
                onSignUp();
                console.log("Data submitted successfully!");
            } else console.log("User Exist");

            // Call insertUserData function from dbUtility to insert user data

            // Optionally, you can reset the form fields here
            setFullname("");
            setEmail("");
            // Optionally, you can perform additional actions after successful submission
           
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="text">
                Fulde navn
            </label>
            <input
                type="text"
                id="name"
                name="full    name"
                placeholder="Dit navn.."
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
            />

            <label htmlFor="e-mail" className="text">
                E-mail
            </label>
            <input
                type="text"
                id="mail"
                name="email"
                placeholder="Din e-mail.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input type="submit" value="Tilmeld" />
        </form>
    );
};

export default Input;
