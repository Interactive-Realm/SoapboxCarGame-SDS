import React, { useState, useEffect, useContext } from "react";
import dbUtility from "./PostGame/Database/dbUtility";
import HighscoreList from "./PostGame/Components/HighscoreList";
import { UserHighscoreNumber } from "./PostGame/types";



function Highscore() {
    const [weeklyHighscores, setWeeklyHighscores] = useState<UserHighscoreNumber[]>([]);

    useEffect(() => {
        console.log("UseEffect Test")
        const interval = setInterval(() => {

            dbUtility.GetHighscore().then((highscores) => {
                setWeeklyHighscores(highscores);
                console.log("Test")
            });

            //UpdateHighscore();

        }, 5000);

        return () => clearInterval(interval);



            
    }, )


    dbUtility.GetHighscore().then((highscores) => {
        setWeeklyHighscores(highscores);
        console.log("Test")
    });


    return (
        <div id="app">
            <img src="/assets/is-logo.png" alt="IS Logo" className='islogo'></img>

            <div>
                <HighscoreList
                    highscores={weeklyHighscores} loaduserscore={false}
                ></HighscoreList>         
            </div>

   
        </div>
    );

};

export default Highscore;
