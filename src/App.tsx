import { useRef, useState, useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { MainMenu } from './game/scenes/MainMenu'; 
import { EventBus } from './game/EventBus';
import InputForm from './game/InputForm';
import IntroPage from './game/IntroPage';

function App()
{

    // State to track whether the registration scene button is clicked
    const [gameEnd, setGameEnd] = useState(false);

    useEffect(() => {
        // Function to handle event emitted from Phaser
        const handlePhaserEvent = (value: boolean) => {
            setGameEnd(value);
        };

        // Listen for the event emitted from Phaser
        EventBus.on('gameEnd', handlePhaserEvent);

        // Clean up the event listener when component unmounts
        return () => {
            EventBus.off('gameEnd', handlePhaserEvent);
        };
    }, []); // Empty dependency array means this effect will run once after the initial render

    

    // State to track whether the game button is clicked
    const [gameStarted, setGameStarted] = useState(false);

    // Function to handle game button click
    const handleGameButtonClick = (isClicked: boolean) => {
        setGameStarted(isClicked);
    };

    const handlePlayAgain = (state: boolean) => {
        setGameStarted(state);
        setGameEnd(!state);
    }


    // ---------------------------------------------------------- //
    // ----- The following is the old Phaser3 template code ----- //

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {

        // If state is active (if not mainmenu), the button is disabled
        //setCanMoveSprite(scene.scene.key !== 'MainMenu');
        
    }   
    
    // ----- The following is the components being rendered ----- //

    if(gameEnd) {
        return(<div id="app">
            <div>
                <InputForm playAgain={handlePlayAgain}></InputForm>
            </div>
        </div>)
    }
    else {
        return (
            <div id="app">
                <div>
                    {!gameStarted ? <IntroPage onButtonClick={handleGameButtonClick} /> : <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />}
                    
                </div> 
            </div>
        )
    }
    
}

export default App
