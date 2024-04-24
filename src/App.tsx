import { useRef, useState, useEffect, useContext } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import { EventBus } from "./EventBus";
import IntroPage from "./IntroPage";
import PostGame from "./PostGame/PostGame";
import { UserContext } from "./UserContext";

function App() {
    // State to track whether the registration scene button is clicked
    const [gameEnd, setGameEnd] = useState(true);

    // State to track whether the game button is clicked
    const [gameStarted, setGameStarted] = useState(false);

    const userInfo = useContext(UserContext);

    useEffect(() => {
        // Function to handle event emitted from Phaser
        const handlePhaserEvent = (value: boolean) => {
            setGameEnd(value);
        };

        // Listen for the event emitted from Phaser
        EventBus.on("gameHasEnded", handlePhaserEvent);

        // Clean up the event listener when component unmounts
        return () => {
            EventBus.off("booleanValue", handlePhaserEvent);
        };
    }, []); // Empty dependency array means this effect will run once after the initial render

    // Function to handle game button click
    const handleGameButtonClick = (isClicked: boolean) => {
        setGameStarted(isClicked);
    };

    const handlePlayAgain = (state: boolean) => {
        setGameStarted(state);
        setGameEnd(!state);
    };

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {};

    // ----- The following is the components being rendered ----- //
    return (
        <UserContext.Provider value={userInfo}>
            <div id="app">
                {gameEnd ? (
                    <PostGame playAgain={handlePlayAgain} />
                ) : (
                    <div>
                        {!gameStarted ? (
                            <IntroPage onButtonClick={handleGameButtonClick} />
                        ) : (
                            <PhaserGame
                                ref={phaserRef}
                                currentActiveScene={currentScene}
                            />
                        )}
                    </div>
                )}
            </div>
        </UserContext.Provider>
    );    
}

export default App;
