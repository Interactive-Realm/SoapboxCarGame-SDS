import Phaser from 'phaser';
import InputField from './scenes/InputField';
import GameEnd from './scenes/GameEnd';
import GameScene from './scenes/GameScene';
import GameCountdown from './scenes/GameCountdown';
import IntroScene from './scenes/IntroScene';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

const config = {
    width: 1920,
    height: 1080,
    type: Phaser.AUTO,
    plugins: {
      scene: [
        {
          key: 'rexUI',
          plugin: RexUIPlugin,
          mapping: 'rexUI'
        }
      ]
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }, 
    backgroundColor: 0x7699c6,
    resolution: window.devicePixelRatio || 1,
}

const initializeGame = () => {
  const game = new Phaser.Game(config);

  
  // Add scenes
  game.scene.add('introscene', IntroScene);
  game.scene.add('gamecountdown', GameCountdown);
  // game.scene.add('inputfield', InputField);
  game.scene.add('gamescene', GameScene);
  game.scene.add('GameEnd', GameEnd);

  // Start game
  game.scene.start('introscene');

};

// Call the async function to initialize the game and insert data
initializeGame();

export default new Phaser.Game(config);

