import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 360,
    height: 800,
    parent: 'game-container',
    scene: [
        Boot,
        Preloader,
        MainGame,
    ],
    physics: {
        default: 'arcade',
        //arcade: {debug: true}
    },
    scale: {
        mode: Phaser.Scale.FIT,
        //autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
    }, 
    backgroundColor: 0x141729,
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
