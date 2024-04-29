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
        <div>
            <div className="text">
                Velkommen til Soapbox Showdown
                <br></br>       
                <br></br>
            </div>
            <div style={{textAlign: "center"}}>
                {/* Attaching onClick event to the button */}
                <button className="introButton" onClick={handleButtonClick}>Til spillet</button>
            </div>
        </div>
    );
}

export default FrontPage;
