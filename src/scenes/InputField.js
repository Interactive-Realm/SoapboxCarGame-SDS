import Phaser from "phaser";
import dbUtility from "../db/dbUtility"; // Adjust the path accordingly

class InputField extends Phaser.Scene {

  // Example: Insert data into a table
  preload() {
    this.load.html('loginform', 'assets/html/loginform.html');
  }

  init(data) {
    // Store the data in the scene for later use
    this.sceneData = data;
    this.score = data.score;
  }

  create() {
    const text = this.add.text(16, 16, '', { fontSize: '32px', fill: 'blue' });
    // Use the correct key ('loginform') when creating from cache
    const element = this.add.dom(500, 500).createFromCache('loginform');

    element.addListener('click');

    element.on('click', function (event) {
      if (event.target.name === 'loginButton') {
        const inputFirstname = this.getChildByName('firstname');
        const inputLastname = this.getChildByName('lastname');
        const inputEmail = this.getChildByName('email');

        // Have they entered anything?
        if (inputFirstname.value !== '' && inputLastname.value !== '' && inputEmail.value !== '') {
          // Turn off the click events
          this.removeListener('click');

          // Tween the login form out
          this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

          this.scene.tweens.add({
            targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
            onComplete: function () {
              element.setVisible(false);
            }
          });

          // Populate the text with whatever they typed in as the username
          // Use inputFirstname.value, inputLastname.value, inputEmail.value to insert into the database
          text.setText(`Welcome ${inputFirstname.value}`);
          
          // Call the database utility to insert data
          dbUtility.insertUserData(inputFirstname.value, inputLastname.value, inputEmail.value, this.scene.sceneData.score);
        } else {
          // Flash the prompt
          this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
        }
      }
    });

    
    

    this.tweens.add({
      targets: element,
      y: 300,
      duration: 3000,
      ease: 'Power3'
    });
  }
  
}

export default InputField;
