import Phaser from 'phaser';



export default class TitleScreen extends Phaser.Scene {
    preload() {

    }

    create() {
        

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        const text = this.add.text(screenCenterX, screenCenterY, "Title Scene").setColor("blue").setFontSize(60);
        text.setOrigin(0.5, 0.5); // Center pivot point
    }
}