import Phaser, { Game } from "phaser";
import dbUtility from "../db/dbUtility"; // Adjust the path accordingly
import Spiligen from '../assets/knap_spiligen.png';

class GameEnd extends Phaser.Scene {

  constructor() {
    super();
    
    this.nameString = 'Navn';
    this.emailString = 'E-mail';

    // Placement and scale variables
    this.textBoxDistance = 90; // Distance between input fields
    this.textFieldHeight = 37; // Input fields height
    this.labelFrameBorder = 20; // Big box frame width
    this.inputFieldBorder = 10; // Input field text box border widths

    this.setHalfAlpha = false;
    
  }

  // Example: Insert data into a table
  preload() {
    this.load.image('spiligen', Spiligen);

  }

  init(data) {
    // Store the data in the scene for later use
    //this.sceneData = data;

    // Score variable
    this.score = data.score;
    //this.score = 6;
  }

  create() {

    // Set background color
    this.cameras.main.setBackgroundColor('#436850');
    


    // Game width and height
    this.gameWidth = this.sys.game.config.width;
    this.gameHeight = this.sys.game.config.height;

    // Bix box
    this.bigBoxBackground = this.rexUI.add.roundRectangle(this.gameWidth / 2, this.gameHeight / 2, this.gameWidth / 2, this.gameHeight / 1.5, 20, '0xADBC9F').setDepth(1);
    this.bigBoxFrame = this.rexUI.add.roundRectangle(this.gameWidth / 2, this.gameHeight / 2, this.gameWidth / 2 + this.labelFrameBorder, this.gameHeight / 1.5 + this.labelFrameBorder, 30, '0x12372A').setDepth(0);

    // Info text
    this.endGameText = this.add.text(this.bigBoxBackground.x, this.bigBoxFrame.y /1.7, '',
      { 
        wordWrap: { width: this.bigBoxBackground.width / 1.2, useAdvancedWrap: true } 
      }
      ).setFontSize(40).setFontStyle('bold').setColor('#12372A').setDepth(1).setOrigin(0.5, 0.5).setStroke('#FBFADA', 3);
    
    // Input Field for name
    this.inputName = this.add.text(this.bigBoxBackground.x, this.gameHeight / 2, this.nameString, { fixedWidth: this.bigBoxBackground.width/1.2, fixedHeight: this.textFieldHeight }).setFontSize(40);
    this.inputName.setOrigin(0.5, 0.5).setDepth(4).setColor('black').setAlpha(0.5);
    
    // Input Field for email
    this.inputEmail = this.add.text(this.bigBoxBackground.x, this.inputName.y + this.textBoxDistance, this.emailString, { fixedWidth: this.bigBoxBackground.width/1.2, fixedHeight: this.textFieldHeight }).setFontSize(40);
    this.inputEmail.setOrigin(0.5, 0.5).setDepth(4).setColor('black').setAlpha(0.5);

    // UI box for input field for name 
    this.textBoxName = this.rexUI.add.roundRectangle(this.inputName.x, this.inputName.y, this.inputName.width + 10, this.inputName.height + 10, 10, '0xFBFADA').setDepth(3);
    this.textFrameName = this.rexUI.add.roundRectangle(this.inputName.x, this.inputName.y, this.textBoxName.width + this.inputFieldBorder, this.textBoxName.height + this.inputFieldBorder, 12, '0x12372A').setDepth(2);

    // UI box for input field for email
    this.textBoxEmail = this.rexUI.add.roundRectangle(this.inputEmail.x, this.inputEmail.y, this.inputEmail.width + 10, this.inputEmail.height + 10, 10, '0xFBFADA').setDepth(3);
    this.textFrameEmail = this.rexUI.add.roundRectangle(this.inputEmail.x, this.inputEmail.y, this.textBoxEmail.width + this.inputFieldBorder, this.textBoxEmail.height + this.inputFieldBorder, 12, '0x12372A').setDepth(2);
    
    // Name Input Field Interaction
    this.inputName.setInteractive().on('pointerdown', () => {
      if(this.inputName.text == this.nameString) { 
        this.inputName.setText('');
      }
      this.rexUI.edit(this.inputName);
    });

    // Email Input Field Interaction
    this.inputEmail.setInteractive().on('pointerdown', () => {
      if(this.inputEmail.text == this.emailString) { 
        this.inputEmail.setText('');
      }
      this.rexUI.edit(this.inputEmail);
    });

    // The player score
    this.scoreLabel = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 9, 'SCORE: ' + this.score)
    .setFontSize(88).setColor('#12372A').setFontStyle('bold').setStroke('#FBFADA', 8).setOrigin(0.5,0.5).setDepth(2);
    
    // Play Again Button Setup
    this.playAgainButton = this.rexUI.add.roundRectangle((this.gameWidth/2) + (this.bigBoxBackground.width/4), this.gameHeight/1.4, this.bigBoxBackground.width/4,this.bigBoxBackground.height/6,10,'0x12372A').setDepth(3)
    .setInteractive().on('pointerdown', () => {
      this.scene.start('gamescene');
    });
    this.playAgainButtonText = this.add.text(this.playAgainButton.x, this.playAgainButton.y, 'Spil igen')
    .setOrigin(0.5,0.5).setFontSize(40).setColor('#FBFADA').setStroke('#FBFADA', 2).setDepth(4);
    
    // Register Button Setup
    this.registerButton = this.rexUI.add.roundRectangle((this.gameWidth/2) - (this.bigBoxBackground.width/4), this.gameHeight/1.4, this.bigBoxBackground.width/4,this.bigBoxBackground.height/6,10,'0x12372A').setDepth(3);
    this.registerButtonText = this.add.text(this.registerButton.x, this.registerButton.y, 'Deltag')
    .setOrigin(0.5,0.5).setFontSize(40).setColor('#FBFADA').setStroke('#FBFADA', 2).setDepth(4);
    this.registerButton.setInteractive().on('pointerdown', () => {
      this.checkInput();
    })
    
    if( this.score <= 5) {
      // Endgame text with not enough points
      this.endGameText.text = 'Desværre! Du fik ikke nok point til at være med i konkurrencen om de fede præmier.';
    
      // Removing input fields and register button
      this.inputName.disableInteractive();
      this.inputEmail.disableInteractive();
      this.inputName.destroy();
      this.inputEmail.destroy();
      this.textBoxName.destroy();
      this.textFrameName.destroy();
      this.textBoxEmail.destroy();
      this.textFrameEmail.destroy();
      this.registerButton.destroy();
      this.registerButtonText.destroy();

      // Center play again button
      this.playAgainButton.setX(this.gameWidth/2);
      this.playAgainButtonText.setX(this.gameWidth/2);
    }
    else {
      // Endgame text with enough points
      this.endGameText.text = 'Tillykke! Du opnåede det nødvendige antal point. \n Indtast navn og e-mail for at deltage i lodtrækningen om de fede præmier.';
    }
  } 
  
  update() {
    // Set alpha levels on name input field text
    if(this.inputName.text == '' || this.inputName.text == this.nameString) {
      this.inputName.setText(this.nameString);
      this.inputName.setAlpha(0.5);
    }
    else if(this.inputName.text != this.nameString) {
      this.inputName.setAlpha(1);
    }

    // Set alpha levels on email input field text
    if(this.inputEmail.text == '' || this.inputEmail.text == this.emailString) {
      this.inputEmail.setText(this.emailString);
      this.inputEmail.setAlpha(0.5);
    }
    else if(this.inputEmail.text != this.emailString) {
      this.inputEmail.setAlpha(1);
    }
  }  

  checkInput(){


        // Have they entered anything?
        if (this.inputName.text !== this.nameString && this.inputEmail.text !== this.emailString) { 

          // Populate the text with whatever they typed in as the username
          // Call the database utility to insert data
          dbUtility.CheckUserData(this.inputEmail.text).then((value) =>{

            // Email doesn't exist, insert users
            if(!value){
              console.log('Email Inserted');
            dbUtility.insertUserData(this.inputName.text, this.inputEmail.text);
            }       
  
            // Email already exist
            else{
              console.log('Email Already Exists');
            }
          }).catch((reason) =>{
            // Error Solution

          });

        } 
        else {
          // INPUT FIELD ARE EMPTY
          console.log('Input fields empty')
          
        }
    
  }
}
export default GameEnd;
