import { EventBus } from '../EventBus';
import { Scene, GameObjects } from 'phaser';

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
    private playerPositionY: number;
    private playerSpeed: number;

    // Asset variables
    parallaxRoadReferenceSize: GameObjects.Image;
    paraRoad: GameObjects.TileSprite;
    parallaxHaybaleReferenceSize: GameObjects.Image;
    paraHaybaleRight: GameObjects.TileSprite;
    paraHaybaleLeft: GameObjects.TileSprite;
    player: GameObjects.Image;
    


    constructor ()
    {
        super('Game');
    }

    preload() {
        // Center of screen
        this.screenCenterX = (this.sys.game.config.width as number) / 2;
        this.screenCenterY = (this.sys.game.config.height as number) / 2;
        // Screen edges, right and bottom
        this.screenWidth = this.sys.game.config.width as number;
        this.screenHeight = this.sys.game.config.height as number;
        // Player start position
        this.playerPositionY = this.screenHeight * 0.75;
        
        // Speed settings
        this.playerSpeed = 200;
    }
    
    init(data: any) {
        // Score variable
        this.score = 0;
    }

    create()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x414046);
        this.SetupRoad();
        this.SetupGameMargin();
        this.SetupPlayer();
    }

    update(delta: number): void {
        // Parallax Movement
        let parallaxMovement = 380 * (delta / 1000);
        this.paraRoad.tilePositionY = -parallaxMovement;
        this.paraHaybaleRight.tilePositionY = -parallaxMovement;
        this.paraHaybaleLeft.tilePositionY = -parallaxMovement;
    }

    SetupRoad(){
        // Added this picture outside of screen view, to reference size of the parafloor tilesprite
        this.parallaxRoadReferenceSize = this.add.image(-400,-400, 'road');

        // Floor tilesprite
        this.paraRoad = this.add.tileSprite(0,0,this.parallaxRoadReferenceSize.width, this.screenHeight, 'road');
        this.paraRoad.setOrigin(0.5, 0.5).setPosition(this.screenCenterX, this.screenCenterY).setDepth(1);
        this.physics.add.existing(this.paraRoad);
    }

    SetupGameMargin() {
        // Added this picture outside of screen view, to reference size of the parafloor tilesprite
        this.parallaxHaybaleReferenceSize = this.add.image(-400,-400, 'haybale');

        // Right margin tilesprites
        this.paraHaybaleRight = this.add.tileSprite(0,0,this.parallaxHaybaleReferenceSize.width, this.screenHeight, 'haybale');
        this.paraHaybaleRight.setOrigin(0.5, 0.5).setPosition(this.screenWidth-64, this.screenCenterY).setDepth(2);
        this.physics.add.existing(this.paraHaybaleRight);

        // Left margin tilesprites
        this.paraHaybaleLeft = this.add.tileSprite(0,0,this.parallaxHaybaleReferenceSize.width, this.screenHeight, 'haybale');
        this.paraHaybaleLeft.setOrigin(0.5, 0.5).setPosition(64, this.screenCenterY).setDepth(2);
        this.physics.add.existing(this.paraHaybaleLeft);
    }

    SetupPlayer() {
        this.player = this.add.image(this.screenCenterX, this.playerPositionY, 'player').setDepth(3);
        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if(pointer.isDown) {
                // Calculate the distance between the player and the pointer
                const distanceX = pointer.x - this.player.x;
                const distanceY = pointer.y - this.player.y;

                // Calculate the angle towards the pointer
                const angle = Math.atan2(distanceY, distanceX);

                // Calculate the velocity components
                const velocityX = Math.cos(angle) * this.playerSpeed;
                const velocityY = Math.sin(angle) * this.playerSpeed;

                // Update the player's position based on velocity
                this.player.x += velocityX * this.game.loop.delta / 1000; // Delta time for smooth movement
                this.player.y += velocityY * this.game.loop.delta / 1000;
            }
            
        }, this);
    }
}
