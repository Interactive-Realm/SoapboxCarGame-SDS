import { EventBus } from '../../EventBus';
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
    private gameSpeed: number;
    private points: GameObjects.Text;
    private scoreTimer: Phaser.Time.TimerEvent;
    private updateGameSpeed: Phaser.Time.TimerEvent;

    private testBoolean: boolean;
    private testMarginObject: GameObjects.Sprite;
    // Asset variables
    player: GameObjects.Image;
    obstacles: Phaser.Physics.Arcade.Sprite[] = [];
    stripes: Phaser.Physics.Arcade.Sprite[] = [];

    updatePlayerPosition: Function;

    cursorIsBeingHeld: boolean;


    
    


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
        this.gameSpeed = 300;

        this.testBoolean = false;

    }
    
    init(data: any) {
        // Score variable
        this.score = 0;
    }

    create()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x414046);
        this.SetupPlayer();
        this.MovePlayer();
        this.SetupCollision();
        this.SetupPoints();
        this.SpawnMargin();
        this.SpawnRoad();
        this.SpawnObstacles();

        this.scoreTimer = this.time.addEvent({
            delay: 25, // Increment score every 1000 milliseconds (1 second)
            callback: this.UpdateScore,
            callbackScope: this,
            loop: true
        });

        this.updateGameSpeed = this.time.addEvent({
            delay: 5000, // Increment score every 1000 milliseconds (1 second)
            callback: this.UpdateGameSpeed,
            callbackScope: this,
            loop: true
        });

        // Create a timed recurring event
        
        console.log("Phaser version: " + Phaser.VERSION);
    }

    SetupPoints() {
        this.points = this.add.text(this.screenCenterX, this.screenHeight/30, "").setDepth(2).setFontSize(48).setOrigin(0.5,0);
    }

    UpdateScore() {
        
        this.score += 1;
        this.updateScoreText();
    }

    updateScoreText() {
        this.points.setText("Distance: " + this.score + " m");
    }

    UpdateGameSpeed() {
        this.gameSpeed += 40;
        var velocity = this.gameSpeed;
        this.obstacles.forEach(function (obstacle) {
            obstacle.setVelocityY(velocity);
        });
        this.stripes.forEach(function(stripe) {
            stripe.setVelocityY(velocity);
        })
        console.log("gamespeed = " + this.gameSpeed);
    }

    SpawnRoad(){

            // Create and position the trash item
            const roadLine = this.physics.add.sprite(
                this.screenCenterX,
                - 96, // spawner lige over browser vinduet
                'roadline'
            ).setDepth(1);

            const spawnline = this.physics.add.sprite(this.screenCenterX, 128, 'spawnline').setOrigin(0.5, 0);


        //  // Move the trash down
        roadLine.setVelocity(0, (this.gameSpeed));
        this.stripes.push(roadLine);

        this.physics.add.overlap(roadLine, spawnline, () => {
        this.LoopRoadSpawn(spawnline);
    });
    }

    SpawnMargin() {

        // Create and position the margin item
        const haybaleLeft = this.physics.add.sprite(
            32,
            - 32, // spawner lige over browser vinduet
            'haybale'
        ).setDepth(1);

        const haybaleRight = this.physics.add.sprite(
            this.screenWidth-32,
            - 32, // spawner lige over browser vinduet
            'haybale'
        ).setDepth(1);
        
        haybaleLeft.setVelocity(0, (this.gameSpeed));
        haybaleRight.setVelocity(0, (this.gameSpeed));

        const spawnline = this.physics.add.sprite(this.screenCenterX, 64, 'spawnline').setOrigin(0.5, 0);

        this.obstacles.push(haybaleLeft);
        this.obstacles.push(haybaleRight);


        this.physics.add.overlap(haybaleRight, spawnline, () => {
            this.LoopMarginSpawn(spawnline);
        });
        
    }

    LoopRoadSpawn(spawnline: Phaser.Physics.Arcade.Sprite) {
        spawnline.destroy(); // Destroy the spawnline sprite
        this.SpawnRoad();
    }

    LoopMarginSpawn(spawnline: Phaser.Physics.Arcade.Sprite) {
        
        spawnline.destroy(); // Destroy the spawnline sprite
        this.SpawnMargin();
    }

    LoopObstacleSpawn(spawnline: Phaser.Physics.Arcade.Sprite) {
        spawnline.destroy(); // Destroy the spawnline sprite
        this.SpawnObstacles();
    }
    
    SpawnObstacles() {
        // Array containing filenames of the images
        const obstacleImages = ['obstacle'];

        // Randomly select an image filename from the array
        const randomImage = Phaser.Math.RND.pick(obstacleImages);

        // Create and position the trash item
        const obstacleObject = this.physics.add.sprite(
            Phaser.Math.Between(64+32, (this.screenWidth-32-64)),
            - 32, // spawner lige over browser vinduet
            randomImage
        ).setDepth(3).setScale(1);

        const spawnline = this.physics.add.sprite(this.screenCenterX, this.screenCenterY, 'spawnline').setOrigin(0.5, 0);

        // Move the trash downwards
        obstacleObject.setVelocity(0, (this.gameSpeed));

        this.obstacles.push(obstacleObject);

        this.physics.add.overlap(obstacleObject, spawnline, () => {
            this.LoopObstacleSpawn(spawnline);
        });
   }

    SetupPlayer() {
        this.player = this.add.image(this.screenCenterX, this.playerPositionY, 'player').setDepth(3);
        this.physics.add.existing(this.player);
    }

    SetupCollision() {
        this.physics.add.overlap(this.player, this.obstacles, this.endGame);
    }
    
    SetCursorHoldTrue = () => {
        this.cursorIsBeingHeld = true;
        console.log(this.cursorIsBeingHeld);
    }

    SetCursorHoldFalse = () =>{
        this.cursorIsBeingHeld = false;
        console.log(this.cursorIsBeingHeld);
    }

    endGame = () => {
        console.log("game ended! Your Score: " + this.score);
        EventBus.emit('score', this.score);
        EventBus.emit('gameHasEnded', true);           
    }


    MovePlayer() {

        
        this.input.on('pointerdown', this.SetCursorHoldTrue);
        this.input.on('pointerup', this.SetCursorHoldFalse);

        this.updatePlayerPosition = function(pointer: Phaser.Input.Pointer) {
            this.player.x = pointer.x;
            this.player.y = pointer.y;
            // Call this function recursively to keep updating player position until pointer is released
            if (this.cursorIsBeingHeld) {
                requestAnimationFrame(() => {
                    this.updatePlayerPosition(pointer);
                });
            }
        }
        // Add pointer down event to keep moving the player towards the pointer even when the pointer is still
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            // Call the update function to start moving the player towards the pointer
            this.updatePlayerPosition(pointer);
        }, this);

    }

}
