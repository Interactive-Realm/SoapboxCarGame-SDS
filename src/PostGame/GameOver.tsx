import React, { useState } from 'react';


function GameOver() {


    return (
        <div>
            <div>
            <img src="/assets/is-logo.png" alt="IS Logo" className='islogo'></img>
            </div>
                <div id="gameover">
                    <h2 id="subtitle3">GAME OVER</h2>
                        <div className='mainfont'>Aw man! That's just unlucky.</div>
                        <img src="assets/crashedcar.png" className='fp-car-picture2'></img>
                        <div className='mainfont'>Want to see how far you got?</div>
                        <div className='container'>
                            <button className='buttonwhite mainfont'>Leaderboard</button>
                        </div>
                </div>
                    
        </div>
    );
}

export default GameOver;
