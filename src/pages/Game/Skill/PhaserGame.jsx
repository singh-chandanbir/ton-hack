import { useEffect } from 'react';
import Phaser from 'phaser';

const PhaserGame = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('sky', 'path/to/sky.png');
    }

    function create() {
      this.add.image(400, 300, 'sky');
    }

    function update() {
      // Game logic
    }

    // Cleanup function
    return () => {
      game.destroy(true);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return <div id="phaser-game"></div>;
};

export default PhaserGame;
