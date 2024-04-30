import React, { useState, useEffect, useContext } from "react";
import { EventBus } from "../EventBus";
import dbUtility from "./Database/dbUtility";
import InputForm from "./Components/InputForm";
import HighscoreList from "./Components/HighscoreList";
import { UserContext } from "./../UserContext";
import { UserHighscoreNumber } from "./types";

var score = 0;
// Subscribe to score updates
EventBus.on("score", (data: number) => {
    score = data;
});

interface FrontPageProps {
    playAgain: (isClicked: boolean) => void; // Callback function type
}

const PostGame: React.FC<FrontPageProps> = ({ playAgain }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [weeklyHighscores, setWeeklyHighscores] = useState<UserHighscoreNumber[]>([]);
    const userInfo = useContext(UserContext)

    useEffect(() => {
        if(userInfo.userInfo != ""){
            console.log(isSignedIn)
            dbUtility.UpdateScore(userInfo.userInfo, score);
            handleSignUp();
            
            
            

        }
    }, [])

    const handleSignUp = () => {
        setIsSignedIn(true);
        dbUtility.GetHighscore().then((highscores) => {
            setWeeklyHighscores(highscores);
        });
    };

    const handlePlayAgain = () => {
        // The parameter of this component is set
        playAgain(true);
    };

    return (
        <div>
            <img src="/assets/is-logo.png" alt="IS Logo" className='islogo'></img>

            {isSignedIn ? (
                <>
                    <p>Your Score</p>
                <h2> </h2>
                    <HighscoreList
                        highscores={weeklyHighscores}
                    ></HighscoreList>

                    <div className="text">
                        <input
                            type="submit"
                            onClick={handlePlayAgain}
                            value="Spil igen"
                        />
                    </div>
                </>
            ) : (
                <>
                    <InputForm onSignUp={handleSignUp} score={score} />
                </>
            )}
        </div>
    );
};

export default PostGame;
