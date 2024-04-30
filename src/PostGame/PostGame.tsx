import React, { useState, useEffect, useContext } from "react";
import { EventBus } from "../EventBus";
import dbUtility from "./Database/dbUtility";
import InputForm from "./Components/InputForm";
import HighscoreList from "./Components/HighscoreList";
import { UserContext } from "./../UserContext";
import { UserHighscoreNumber } from "./types";

var score = "";
// Subscribe to score updates
EventBus.on("score", (data: number) => {
    score = data.toString();
});

interface FrontPageProps {
    playAgain: (isClicked: boolean) => void; // Callback function type
}

const PostGame: React.FC<FrontPageProps> = ({ playAgain }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [weeklyHighscores, setWeeklyHighscores] = useState<UserHighscoreNumber[]>([]);
    const userInfo = useContext(UserContext)
    userInfo.score = score;

    useEffect(() => {
        if(userInfo.userInfo != ""){
            console.log(isSignedIn)
            dbUtility.UpdateScore(userInfo.userInfo, parseInt(userInfo.score));
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
                    <HighscoreList
                        highscores={weeklyHighscores}
                    ></HighscoreList>

                    <div id="buttonctn">
                        <input className="buttonwhitesmall"
                            type="submit"
                            onClick={handlePlayAgain}
                            value="Play Again"
                        />
                    </div>
                </>
            ) : (
                <>
                    <InputForm onSignUp={handleSignUp} score={ parseInt(userInfo.score)} />
                </>
            )}
        </div>
    );
};

export default PostGame;
