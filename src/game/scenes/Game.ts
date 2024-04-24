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
    private updateGamespeed: boolean;
    private elapsedTime: number;

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

        this.updateGamespeed = false;
        this.elapsedTime = 0;
    }
    
    init(data: any) {
        // Score variable
        this.score = 0;
    }

    create()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x414046);
        this.StartRoadSpawner();
        this.StartMarginSpawner();
        this.SetupPlayer();
        this.MovePlayer();
        this.SetupCollision();
        this.StartObstacleSpawner();
        this.SetupPoints();
        // Create a timed recurring event
        
        console.log("Phaser version: " + Phaser.VERSION);
    }
    StartRoadSpawner() {
        this.time.addEvent({
            delay: 500, // The delay in milliseconds before the event first triggers
            callback: this.SpawnRoad, // The function to call when the event triggers
            callbackScope: this, // The scope in which the callback function will be called
            loop: true // Set to true to make the event repeat infinitely
        });
    }

    StartObstacleSpawner() {
        this.time.addEvent({
            delay: 1000, // The delay in milliseconds before the event first triggers
            callback: this.SpawnObstacles, // The function to call when the event triggers
            callbackScope: this, // The scope in which the callback function will be called
            loop: true // Set to true to make the event repeat infinitely
        });
    }

    StartMarginSpawner() {
        this.time.addEvent({
            delay: 130, // The delay in milliseconds before the event first triggers
            callback: this.SpawnMargin, // The function to call when the event triggers
            callbackScope: this, // The scope in which the callback function will be called
            loop: true // Set to true to make the event repeat infinitely
        });
    }

    update(delta: number): void {
        this.UpdateScore(delta);
        this.UpdateGameSpeed(delta);
    }

    SetupPoints() {
        this.points = this.add.text(this.screenCenterX, this.screenHeight/30, "").setDepth(2).setFontSize(48).setOrigin(0.5,0);
    }

    UpdateScore(delta: number) {
        
        var elapsedTime: number = 0;
        // Update elapsed time
        elapsedTime += delta;
    
        // Increase score linearly every second
        if (elapsedTime >= 1000) { 
            this.score += 1; // Increase score by 1
            elapsedTime -= 1000; 
            this.updateScoreText(); // Update the score text
        }          
    }
    UpdateGameSpeed(delta:number) {
        var elapsedTime: number = 0;
        // Update elapsed time
        this.elapsedTime += delta;
    
        // Increase score linearly every second
        if (this.elapsedTime >= 1000000) { 
            this.gameSpeed += 20;
            var gameSpeed: number = 0;
            gameSpeed = this.gameSpeed;
            this.elapsedTime -= 1000000; 
            this.obstacles.forEach(function(obstacle) {
                // Get the physics body of the obstacle sprite
                const obstacleBody = obstacle.body as Phaser.Physics.Arcade.Body;

                // Set velocity for the obstacle sprite's body
                obstacleBody.setVelocityY(gameSpeed);
            });
            this.stripes.forEach(function(stripe) {
                const stripeBody = stripe.body as Phaser.Physics.Arcade.Body;

                stripeBody.setVelocityY(gameSpeed);
            })
            console.log("updated gamespeed to: " + this.gameSpeed);
        }          
    }
    updateScoreText() {
        this.points.setText("Score: " + this.score);
    }

    SpawnRoad(){

        // Create and position the trash item
        const roadLine = this.physics.add.sprite(
            this.screenCenterX,
            - 96, // spawner lige over browser vinduet
            'roadline'
        ).setDepth(1);


       //  // Move the trash down
       roadLine.setVelocity(0, (this.gameSpeed));
       this.stripes.push(roadLine);
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

       this.obstacles.push(haybaleLeft);
       this.obstacles.push(haybaleRight);
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

        // Move the trash downwards
        obstacleObject.setVelocity(0, (this.gameSpeed));

        this.obstacles.push(obstacleObject);
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

    endGame() {
        EventBus.emit('gameHasEnded', true);   
        console.log("game ended!");
    }


    MovePlayer() {

        
        this.input.on('pointerdown', this.SetCursorHoldTrue);
        this.input.on('pointerup', this.SetCursorHoldFalse);

        this.updatePlayerPosition = function(pointer: Phaser.Input.Pointer) {
            // Calculate the angle towards the pointer
            const distanceX = pointer.x - this.player.x;
            const distanceY = pointer.y - this.player.y;
            const angle = Math.atan2(distanceY, distanceX);
        
            // Calculate the velocity components
            const velocityX = Math.cos(angle) * this.playerSpeed;
            const velocityY = Math.sin(angle) * this.playerSpeed;
        
            // Update the player's position based on velocity
            this.player.x += velocityX * this.game.loop.delta / 1000; // Delta time for smooth movement
            this.player.y += velocityY * this.game.loop.delta / 1000;


            //const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
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
