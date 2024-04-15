import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { GameCountdown } from './scenes/GameCountdown';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameCountdown,
        GameOver,
    ],
    physics: {
        default: 'arcade',
    },
    scale: {
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
    }, 
    backgroundColor: 0x7699c6,
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
