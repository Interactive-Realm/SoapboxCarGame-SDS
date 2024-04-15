import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    // Generic Phaser Objects
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;

    // Screen Definitions
    private screenCenterX: number;
    private screenCenterY: number;
    private screenWidth: number;
    private screenHeight: number;

    // Game Variables
    private score: number;


    constructor ()
    {
        super('Game');
    }

    preload() {
        // Center of screen
        this.screenCenterX = (this.sys.game.config.width as number) / 2;
        this.screenCenterY = (this.sys.game.config.height as number) / 2;
        this.screenWidth = this.sys.game.config.width as number;
        this.screenHeight = this.sys.game.config.height as number;
    }
    
    init(data: any) {
        // Score variable
        this.score = 0;
    }

    create()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x002B5B);
    }
}
