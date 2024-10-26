import { useEffect } from 'react';
import Phaser from 'phaser';
import { io } from 'socket.io-client';
import { SocketServer } from '../../../Constants';

const PhaserGame = () => {
  // const [playerCoordinates, setPlayerCoordinates] = useState({ x: 0, y: 0 });
  // const [isServerConnected, setIsServerConnected] = useState(false);

  useEffect(() => {
    const socket = io(SocketServer);

    console.log(socket.id);

    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-game',
      width: 900,
      height: 1600,
      scale: {},
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
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
    let speed = 190;

    function preload() {
      // this.load.image('playerUp', '/gameAssets/player_up.png');
      // this.load.image('playerDown', '/gameAssets/player_down.png');
      this.load.image('playerLeft', '/gameAssets/player1_left.png');
      this.load.image('playerRight', '/gameAssets/player1_right.png');

      // this.load.image('background', '/gameAssets/player1_left.png'); // Replace with your background image path
      this.load.image('dead', '/gameAssets/dead_player.png'); // Replace with your enemy image path
    }

    function create() {
      let gameHeight = window.innerHeight - 30;
      let gameWidth = (gameHeight * 9) / 16;
      this.scale.resize(gameWidth, gameHeight);
      // // Add a background image to the game
      // const gameWidth = this.scale.width;
      // const gameHeight = this.scale.height;
      // aspectRatio;
      // this.add.image(gameWidth / 2, gameHeight / 2, 'background');

      // Add a player sprite at the center of the screen
      player = this.physics.add.sprite(0, 0, 'playerLeft');

      player.scaleX = 0.2;
      player.scaleY = 0.2;

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
        player.setVelocityX(-speed);
      } else if (cursors.right.isDown) {
        player.setTexture('playerRight');
        player.setVelocityX(speed);
      }

      // Vertical movement
      if (cursors.up.isDown) {
        player.setVelocityY(-speed);
      } else if (cursors.down.isDown) {
        player.setVelocityY(speed);
      }
      if (
        cursors.up.isDown ||
        cursors.down.isDown ||
        cursors.left.isDown ||
        cursors.right.isDown
      ) {
        console.log('Emitting player coordinates to server...');
        socket.emit('playerCoordinates', {
          x: player.x,
          y: player.y,
        }); // Add your custom logic here
      }
    }

    // Cleanup function
    return () => {
      socket.disconnect();
      game.destroy(true);
    };
  }, []); // Runs once on mount and cleans up on unmount

  return <div id="phaser-game" className="h-[100vh]" />;
};

export default PhaserGame;
