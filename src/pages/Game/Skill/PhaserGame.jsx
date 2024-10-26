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
          gravity: { y: 0 }, // No gravity for a top-down movement game
          debug: true,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);
    let player;
    let cursors;
    let spaceKey;

    function preload() {
      // this.load.image('playerUp', '/gameAssets/player_up.png');
      // this.load.image('playerDown', '/gameAssets/player_down.png');
      this.load.image('playerLeft', '/gameAssets/player1_left.png');
      this.load.image('playerRight', '/gameAssets/player1_right.png');

      this.load.image('background', '/gameAssets/player1_left.png'); // Replace with your background image path
      this.load.image('dead', '/gameAssets/dead_player.png'); // Replace with your enemy image path
    }

    function create() {
      // Add a background image to the game
      this.add.image(400, 300, 'background');

      // Add a player sprite at the center of the screen
      player = this.physics.add.sprite(400, 300, 'playerLeft');

      // Make the player stay within the bounds of the game world
      player.setCollideWorldBounds(true);

      // Create cursor keys for input
      cursors = this.input.keyboard.createCursorKeys();

      spaceKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );

      spaceKey.on('down', () => {
        console.log('Spacebar pressed! Changing texture.');
        player.setTexture('dead'); // Change 'playerJump' to the key of the texture you want to display.
      });
    }

    function update() {
      // Reset player velocity (so it stops when no key is pressed)
      player.setVelocity(0);

      // Horizontal movement
      if (cursors.left.isDown) {
        player.setTexture('playerLeft');
        player.setVelocityX(-160);
      } else if (cursors.right.isDown) {
        player.setTexture('playerRight');
        player.setVelocityX(160);
      }

      // Vertical movement
      if (cursors.up.isDown) {
        player.setVelocityY(-160);
      } else if (cursors.down.isDown) {
        player.setVelocityY(160);
      }
    }

    // Cleanup function
    return () => {
      game.destroy(true);
    };
  }, []); // Runs once on mount and cleans up on unmount

  return <div id="phaser-game" />;
};

export default PhaserGame;
