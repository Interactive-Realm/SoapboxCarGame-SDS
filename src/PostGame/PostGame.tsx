import React, { useState, useEffect, useContext } from "react";
import { EventBus } from "../EventBus";
import dbUtility from "./Database/dbUtility";
import InputForm from "./Components/InputForm";
import HighscoreList from "./Components/HighscoreList";
import { UserContext } from "./../UserContext";
import { UserHighscoreNumber } from "./types";

var score = "5555";
// Subscribe to score updates
EventBus.on("score", (data: number) => {
    score = data.toString();
});

interface FrontPageProps {
    playAgain: (isClicked: boolean) => void; // Callback function type
}

const PostGame: React.FC<FrontPageProps> = ({ playAgain }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [weeklyHighscores, setWeeklyHighscores] = useState<
        UserHighscoreNumber[]
    >([]);
    const userInfo = useContext(UserContext);
    userInfo.score = score;

    useEffect(() => {
        checkUserInfo();
    }, []);

    const checkUserInfo = async () => {
        if (JSON.parse(localStorage.getItem("userinfo")!) != null) {
            if (await dbUtility.CheckUserData(JSON.parse(localStorage.getItem("userinfo")!), "sdsusers")) {
                //console.log(isSignedIn);
                userInfo.userInfo = JSON.parse(localStorage.getItem("userinfo")!);
                dbUtility.UpdateScore(
                    userInfo.userInfo,
                    parseInt(userInfo.score)
                );
                handleSignUp();
            } else {
                localStorage.removeItem("userinfo");
            }
        }
    };

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
            <img
                src="/assets/is-logo.png"
                alt="IS Logo"
                className="islogo"
            ></img>

            {isSignedIn ? (
                <>
                    <HighscoreList
                        highscores={weeklyHighscores}
                        loaduserscore={true}
                    ></HighscoreList>

                    <div id="buttonctn">
                        <input
                            className="buttonwhitesmall"
                            type="submit"
                            onClick={handlePlayAgain}
                            value="Play Again"
                        />
                    </div>
                </>
            ) : (
                <>
                    <InputForm
                        onSignUp={handleSignUp}
                        score={parseInt(userInfo.score)}
                    />
                </>
            )}
        </div>
    );
};

export default PostGame;
