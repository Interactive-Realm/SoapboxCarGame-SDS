import React, { useState } from 'react';

interface FrontPageProps {
    onButtonClick: (isClicked: boolean) => void; // Callback function type
}
// Creating the frontpage demanding a boolean parameter of a button click 
const FrontPage: React.FC<FrontPageProps> = ({ onButtonClick }) => {
    
    // State to track whether the start game button is clicked
    const [buttonClicked, setButtonClicked] = useState(false);

    // Function to handle button click
    const handleButtonClick = () => {
        // Set buttonClicked state to true
        setButtonClicked(true);
        
        // The parameter of this component is set
        onButtonClick(true);
    };

    return (
        <div id="app">
            <img src="/assets/is-logo.png" alt="IS Logo" className='islogo'></img>
            
             <div className="headline">
                Institutdysten
            </div>
            <div className='underheadline'>by SDS</div>

            <div className='infotext'>Lorem ipsum and secure your faculty in the leaderboard to win a special prize!</div>
         
                <img src="assets/CarLogo.png" className='fp-car-picture'></img>
               
            
            <div className='gamename-text'>SOAPBOX SHOWDOWN</div>
            
            <div className='container'>
                <button className='buttonblack' onClick={handleButtonClick}>Ready?</button>
            </div>
            <div className='container'>
                <button className="buttonwhite">Leaderboard</button>
            </div>
        </div>
    );
}

export default FrontPage;
