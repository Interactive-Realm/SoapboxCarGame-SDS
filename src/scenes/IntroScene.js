import Phaser from 'phaser';
import RealmLogo from '../assets/realm_logo.png'
import Spiligen from '../assets/knap_spiligen.png';


class IntroScene extends Phaser.Scene {
    constructor() {
        super();

        // Color scheme:
        this.darkGreen = '#12372A';
        this.green = '#436850';
        this.lightGreen = '#ADBC9F';
        this.white = '#FBFADA';

        // Placement variables
        this.topMargin = 100;
        this.bottomMargin = 300;
        this.topText_Distance = 90;
        this.mainPrize_distanceFrom_topScreen = 345;
        this.weeklyPrizes_distanceFrom_topScreen = 480;
        this.weeklyPrizes_distance = 60;
        this.logoPlacementY = 100;
        this.logoPlacementX;

        // Width of main prize text
        this.mainPrizeWidth = 1400;


        // Play game button size definition
        this.gameButtonHeight = 100;
        this.gameButtonWidth = 500;
    }

    preload() {
        this.load.image('logo', RealmLogo);
        this.cameras.main.setBackgroundColor('#436850'); // Background color
        
        // Game window width and height
        this.gameWidth = this.sys.game.config.width;
        this.gameHeight = this.sys.game.config.height;

        // Center logo
        this.logoPlacementX = this.gameWidth/2;
    }

    create() {
        // Top text
        this.topText1 = this.add.text(this.gameWidth/2, this.topMargin, 'FJERN SKRALD')
        .setFontSize(90).setColor('#FBFADA').setDepth(1).setOrigin(0,0.5);
        this.topText2 = this.add.text(this.gameWidth/2, this.topText1.y + this.topText_Distance, 'OG VIND!')
        .setFontSize(90).setColor('#FBFADA').setDepth(1).setOrigin(0,0.5);

        // Align top text correctly
        this.topText1.setX(this.topText1.x - (this.topText2.width/2));
        this.topText2.setX(this.topText2.x - (this.topText2.width/2));

        // Main prize, which is defined inside an invisible box with 
        this.mainPrize = this.add.text(this.gameWidth/2, this.mainPrize_distanceFrom_topScreen, 'HOVEDPRÆMIE: SUPER LUKSUS TING FRA VORES VARELAGER',
        {
            wordWrap: { width: this.mainPrizeWidth, useAdvancedWrap: true } 
        })
        .setFontSize(78).setColor('#12372A').setFontStyle('bold').setDepth(1).setOrigin(0.5,0.5).setStroke('#ADBC9F', 3);

        // Weekly prizes
        this.weeklyPrizes = this.add.text(this.gameWidth/2, this.weeklyPrizes_distanceFrom_topScreen, 'PRÆMIER HVER UGE:')
        .setFontStyle('bold').setFontSize(40).setOrigin(0,0.5);
        this.weeklyPrizes.setX(this.weeklyPrizes.x - (this.weeklyPrizes.width/2));
        this.weeklyPrize1 = this.add.text(this.weeklyPrizes.x, this.weeklyPrizes.y + this.weeklyPrizes_distance, '1. Plads: 1 mio. DKK.')
        .setFontSize(40).setOrigin(0,0.5);
        this.weeklyPrize2 = this.add.text(this.weeklyPrizes.x, this.weeklyPrize1.y + this.weeklyPrizes_distance, '2. Plads: ½ mio. DKK.')
        .setFontSize(40).setOrigin(0,0.5);
        this.weeklyPrize3 = this.add.text(this.weeklyPrizes.x, this.weeklyPrize2.y + this.weeklyPrizes_distance, '3. Plads: 0 DKK.')
        .setFontSize(40).setOrigin(0,0.5);

        // Play the game button
        this.toGameButton = this.rexUI.add.roundRectangle(this.gameWidth/2, this.gameHeight - this.bottomMargin, this.gameButtonWidth, this.gameButtonHeight, 10, '0x12372A')
        .setDepth(1).setOrigin(0.5,0.5);
        this.playGameText = this.add.text(this.toGameButton.x, this.toGameButton.y, "Play The Game")
        .setDepth(2).setColor('#FBFADA').setFontSize(56).setOrigin(0.5,0.5).setInteractive().on('pointerdown', () => {
            this.scene.start('gamescene');
          });

          // The logo
        this.logoRealm = this.add.image(this.logoPlacementX, this.gameHeight - this.logoPlacementY, 'logo').setDepth(1);
        this.logoBackgroundWhite = this.rexUI.add.roundRectangle(this.gameWidth/2, this.logoRealm.y, this.gameWidth, this.logoRealm.height, 0, '0xffffff').setDepth(0);
    }
}

export default IntroScene;