import Phaser from 'phaser';
import Knife from '../assets/ButterKnife_128x128.png';
import Fork from '../assets/Fork_128x128.png';
import Bottle from '../assets/BeerBottle_128x128.png';
import Bubble from '../assets/Bubble1.png';


class GameScene extends Phaser.Scene {

    constructor() {
        super();

        // Booleans
        this.gameStarted = false;

        // Spawnvariables
        this.lastTrashSpawnTime = 0;
        this.trashSpawnInterval = 200; // in milliseconds
        this.lastBubbleSpawnTime = 0;
        this.bubbleSpawnInterval = 400;

        // Timer variables
        this.timer;
        this.initialTime = 5; // in seconds
        this.timerLabel;

        // UI variables
        this.scoreLabel;
        
    }
    preload() {
        
        this.load.image('knife', Knife);
        this.load.image('fork', Fork);
        this.load.image('bottle', Bottle);
        this.load.image('bubble', Bubble);

        // Center of screen
        this.screenCenterX = this.sys.game.config.width / 2;
        this.screenCenterY = this.sys.game.config.height / 2;
    }

    init(data){
        // Score variable
        this.score = 0;
    }

    create() {

        // Tutorial text objects
        const tutorialText1 = this.add.text(this.screenCenterX, 510, 'This is how you play:', {
            fontFamily: 'DIN',
            color: '#97FEED',
            font: 'bold 40px DIN',
            }).setDepth(1).setOrigin(0.5, 0.5);
        const tutorialText2 = this.add.text(this.screenCenterX, 560, 'Click on the falling trash, to remove it from the ocean.', {
            fontFamily: 'DIN',
            color: '#97FEED',
            font: 'normal 30px DIN',
            }).setDepth(1).setOrigin(0.5, 0.5);

        // Start game button
        const startButton = this.add.text(this.screenCenterX, 835, 'Start game', {
            fontFamily: 'DIN',
            color: '#97FEED',
            font: 'bold 40px DIN',
        });
        startButton.setDepth(1).setOrigin(0.5, 0.5);
        startButton.setInteractive().on('pointerdown', () => {
            tutorialText1.destroy();
            tutorialText2.destroy();
            startButton.destroy();
            
            this.scene.launch('gamecountdown');
        });

        
        
        // The score
        this.scoreLabel = this.add.text(this.sys.game.config.width - 10, 20, 'SCORE: 0', {
            fontSize: '32px',
            fill: '#fff',
            align: 'right',
            fontFamily: 'Roboto, sans-serif',
        }).setOrigin(1, 0).setDepth(2).setStyle({
            position: 'fixed',
            opacity: 0.9,
            inset: 0,
            backgroundColor: 'rgb(240, 240, 240)',
            // Apply styles from the CSS
            textTransform: 'uppercase',
            fontWeight: 'bold',
            backgroundColor: '#164196',
            color: '#ffffff',
            lineSpacing: 0,
            boxDecorationBreak: 'clone',
            boxSizing: 'border-box',
            
        }).setPadding({x: 15});

        // Enable fullscreen button
        this.input.keyboard.on('keydown-F', function (event) {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        }, this);

        // Listen for the event that gamecountdown scene has finished, thus returning data = true
        this.scene.get('gamecountdown').events.on('sendData', this.receiveData, this);
    }

    // Recieve data from game countdown, then start the game
    receiveData(data) {
        if(data === true) {
            this.gameStarted = true;
            this.startCountdown();
        }
    }

    update(time, delta) {
        if(this.gameStarted === true) {
            // Spawn trash, if game has started
            if (time - this.lastTrashSpawnTime > this.trashSpawnInterval) {
                this.spawnTrashObject();
                this.lastTrashSpawnTime = time;
            }
        }
        
        // Spawn bubbles
        if (time - this.lastBubbleSpawnTime > this.bubbleSpawnInterval) {
            this.spawnBubbleObject();
            this.lastBubbleSpawnTime = time;
        }        
    }

    // Bubble spawner
    spawnBubbleObject() {
            const bubbleObject = this.add.image(
                Phaser.Math.Between(0, this.sys.game.config.width),
                +this.sys.game.config.height + 120, // spawner lige under spilvinduet
                'bubble'
            ).setDepth(0).setScale(this.FloatBetween(0.05, 0.2));

            this.physics.add.existing(bubbleObject);
            bubbleObject.body.setVelocity(0, 100);

        // Set initial horizontal velocity
        //const horizontalVelocity = Phaser.Math.FloatBetween(-50, 50); // Random horizontal velocity

        this.physics.add.existing(bubbleObject);

        // Set horizontal velocity
        //flagObject.body.setVelocityX(horizontalVelocity);
        bubbleObject.body.setVelocityY(Phaser.Math.Between(-50, -200)); // Vertical velocity

        // Optional: Add damping to gradually slow down rotation and movement
        bubbleObject.body.angularDamping = 0.95;
        bubbleObject.body.linearDamping = 0.95;

        // Set opacity (e.g., 0.5 for half-transparent)
        bubbleObject.setAlpha(0.4);

        // Define the movement range
        var moveDistance = 20; // Distance the object will move
        var moveDuration = 2000; // Duration of each movement (in milliseconds)

        // Create the tween
        var tweenRight = this.tweens.add({
            targets: bubbleObject,
            x: bubbleObject.x + moveDistance,
            duration: moveDuration,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1 // -1 means repeat indefinitely
        });
    }

    // Trash spawner
    spawnTrashObject() {

        // Array containing filenames of the images
        const trashImages = ['knife', 'fork', 'bottle'];

        // Randomly select an image filename from the array
        const randomImage = Phaser.Math.RND.pick(trashImages);

        // Create and position your the balloon
        const balloonObject = this.add.image(
            Phaser.Math.Between(0, this.sys.game.config.width),
            this.sys.game.config.height - 1200, // spawner lige under browser vinduet
            randomImage
        ).setDepth(1).setScale(1);
        
        this.physics.add.existing(balloonObject);
        // Move the trash down
        balloonObject.body.setVelocity(0, Phaser.Math.Between(+175, +215));

        balloonObject.setInteractive();
        
        // // Listen for the pointerdown event
         balloonObject.on('pointerdown', () => {
             balloonObject.destroy();
            // Increment the score
            this.score += 1;
            // Update the score label
            this.scoreLabel.setText('SCORE: ' + this.score);
        });
    }

    FloatBetween = function (min, max)
    {
        return Math.random() * (max - min) + min;
    };

    startCountdown() {
        // Display the initial time
        this.timerLabel = 
        this.add.text(10, 20, 'TIME LEFT: ' + this.formatTime(this.initialTime), 
        { fontSize: '32px',
        fill: '#fff',
        align: 'right',
        fontFamily: 'Roboto, sans-serif' }).setDepth(2).setStyle({
            position: 'fixed',
            opacity: 0.9,
            inset: 0,
            backgroundColor: 'rgb(240, 240, 240)',
            // Apply styles from the CSS
            textTransform: 'uppercase',
            fontWeight: 'bold',
            backgroundColor: '#164196',
            color: '#ffffff',

            boxDecorationBreak: 'clone',
            boxSizing: 'border-box',
        }).setPadding({x: 15});


        // Create a countdown timer
        this.timer = this.time.addEvent({
            delay: 1000, // 1 second
            repeat: this.initialTime - 1, // Repeat the event `initialTime` times (initialTime - 1 because we're already displaying the initial time)
            callback: this.onTimerTick,
            callbackScope: this,
        });
    }

    onTimerTick() {
        // Update the displayed time
        this.timerLabel.setText('TIME LEFT: ' + this.formatTime(this.timer.repeatCount));

        // Check if the timer has reached 0
        if (this.timer.repeatCount === 0) {
            this.gameStarted = false;
            this.endGame(); // Add your logic for what should happen when the timer reaches 0
        }
    }

    endGame() {

        console.log('Game Over!');

        // Sending score data to endscene and starting the scene
        this.scene.start('GameEnd', { score: this.score});
        
    }

    formatTime(seconds) {
        // Format the time as mm:ss
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
}

export default GameScene;