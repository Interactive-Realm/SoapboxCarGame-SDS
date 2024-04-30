import { Scene } from 'phaser';

export class Preloader extends Scene
{

    private screenWidth: number;
    private screenHeight: number;

    constructor ()
    {
        super('Preloader');
    }

    init ()
    {

        this.screenWidth = this.sys.game.config.width as number;
        this.screenHeight = this.sys.game.config.height as number;

        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(this.screenWidth/2, 250, 'logo');

        //  A simple progress bar. This is the outline of the bar.
        const outline = this.add.rectangle(this.screenWidth/2, this.screenHeight/2, this.screenWidth/1.4, this.screenHeight/15).setStrokeStyle(1, 0xffffff).setOrigin(0.5,0.5);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(outline.x, outline.y, outline.width-10, outline.height-10, 0xffffff).setOrigin(0.5,0.5);
        const barwidthref = bar.width;

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = (barwidthref * progress);

        });
    }

    preload ()
    {

        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
        this.load.image('road', 'placeholder_road.png');
        this.load.image('player', 'car.png');
        this.load.image('haybale', 'haybale.png');
        this.load.image('tire', 'cartire.png');
        this.load.image('roadline', 'roadline.png');
        this.load.image('spawnline', 'spawnline.png');
        this.load.image('ir-logo', 'ir-logo-phaser.png');
        this.load.image('instructions', 'instructions.png');
        this.load.image('cone', 'trafficcone.png');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        //this.scene.start('Game');
    }
}
