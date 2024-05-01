import React, { useState } from 'react';
import { EventBus } from "../EventBus";
import { useContext } from 'react';
import { UserContext } from "./../UserContext";

var score = "";
// Subscribe to score updates
EventBus.on("score", (data: number) => {
    score = data.toString();
});

interface FrontPageProps {
    onGameOver: (isClicked: boolean) => void; // Callback function type
}

const GameOver: React.FC<FrontPageProps> = ({ onGameOver }) => {
    
    const userInfo = useContext(UserContext);

    const handleButtonClick = () => {

        onGameOver(false)

    };


    return (
        <div>
            <div>
            <img src="/assets/is-logo.png" alt="IS Logo" className='islogo'></img>
            </div>
                <div id="gameover">
                    <h2 id="subtitle3">GAME OVER</h2>
                        <div className='mainfont'>Aw man! That's just unlucky.</div>
                        <br></br>
                        <br></br>
                        <div>
                            <p id="highscore_element" className="scoreTitle">Your Score</p>
                            <p className="scoreText">{score}</p>
                        </div>
                        <img src="assets/crashedcar.png" className='fp-car-picture2'></img>
                        <div className='mainfont'>Want to see how far you got?</div>
                        <div className='container'>
                            <button className='buttonwhite mainfont' onClick={handleButtonClick}>{userInfo.userExist ? (<>Leaderboard</>):(<>Sign-Up</>)}</button>
                        </div>
                </div>
                    
        </div>
    );
}

export default GameOver;
