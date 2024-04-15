import React, { useState } from 'react';
import { EventBus } from "./EventBus";
import dbUtility from "./db/dbUtility";

    let userHasSubmittedData: boolean;
    var score = 0;
    // Subscribe to score updates
    EventBus.on('score', (data: number) => {
        console.log(data);
        score = data;
        
    });

    interface FrontPageProps {
        playAgain: (isClicked: boolean) => void; // Callback function type
    }
    // Creating the frontpage demanding a boolean parameter of a button click 
    const Input: React.FC<FrontPageProps> = ({ playAgain }) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    //var [score, setScore] = useState<number>();

    const handlePlayAgain = () => {

        // The parameter of this component is set
        playAgain(true);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            // Call insertUserData function from dbUtility to insert user data
            await dbUtility.insertUserData(fullname, email, score as number);
            // Optionally, you can reset the form fields here
            setFullname('');
            setEmail('');
            // Optionally, you can perform additional actions after successful submission
            console.log('Data submitted successfully!');
            userHasSubmittedData = true;
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    

    if(score < 10) {
        return(
            <div className='text'>
                Desværre, din score er ikke høj nok til at være med i konkurrencen, prøv igen!
                <input type="submit" onClick={handlePlayAgain} value="Spil igen"/>
            </div>
        );
    }
    else {
        if(userHasSubmittedData) {
            return(<div className='text'>
            Tak for din deltagelse!
            <input type="submit" onClick={handlePlayAgain} value="Spil igen"/>
        </div>)
            
        }
        else {
            return (
                <div>
                    <div>
                        <h1>DIN SCORE: {score}</h1>
                        <div className="text">Tillykke! Du har scoret nok point til at være med i konkurrencen. Indtast navn og mail herunder for at deltage.</div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name" className="text">Fulde navn</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="fullname" 
                            placeholder="Dit navn.." 
                            value={fullname} 
                            onChange={(e) => setFullname(e.target.value)} 
                            required
                        />
        
                        <label htmlFor="e-mail" className="text">E-mail</label>
                        <input 
                            type="text" 
                            id="mail" 
                            name="email" 
                            placeholder="Din e-mail.." 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
        
                        <input type="submit" value="Tilmeld"/>
                    </form>
                </div>
            );
        }
        
    }
    
}

export default Input;