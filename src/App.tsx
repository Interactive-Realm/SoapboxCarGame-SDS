import { useRef, useState, useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { EventBus } from './game/EventBus';

function App()
{
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        
    }   
    
    // ----- The following is the components being rendered ----- //

    return(<div id="app">
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        </div>)
}

export default App
