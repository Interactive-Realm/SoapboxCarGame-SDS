import React, { useState, useEffect } from "react";
import { EventBus } from "../EventBus";
import dbUtility from "./Database/dbUtility";
import InputForm from "./Components/InputForm";
import HighscoreList from "./Components/HighscoreList";
import { UserHighscore } from "./types";

var score = 0;
// Subscribe to score updates
EventBus.on("score", (data: number) => {
    console.log(data);
    score = data;
});

interface FrontPageProps {
    playAgain: (isClicked: boolean) => void; // Callback function type
}

const PostGame: React.FC<FrontPageProps> = ({ playAgain }) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [weeklyHighscores, setWeeklyHighscores] = useState<
        { name: string; email: string; score: string }[]
    >([]);

    useEffect(() => {
        (async () => {
            dbUtility.GetHighscore().then((highscores) => {
                setWeeklyHighscores(highscores);
                console.log(highscores);
            });
        })();
    }, []);

    const handleSignUp = () => {
        setIsSignedIn(true);
    };

    const handlePlayAgain = () => {
        // The parameter of this component is set
        playAgain(true);
    };

    return (
        <div>
            <div>
                <h1>
                    DIN SCORE: {score}
                    {isSignedIn}
                </h1>
            </div>

            {isSignedIn ? (
                <>
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
