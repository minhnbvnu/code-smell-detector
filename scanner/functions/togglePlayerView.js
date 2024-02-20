function togglePlayerView() {
    // Toggle the playerView value
    this.playerView = !this.playerView;

    if (this.playerView) {
      this.cameras.main.startFollow(playerSprite, true);
      this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);
    }
    else if (!this.playerView) {

      this.cameras.main.zoom = 0.85;
  
      const controlConfig = {
          camera: this.cameras.main,
          left: this.cursors.left,
          right: this.cursors.right,
          up: this.cursors.up,
          down: this.cursors.down,
          zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
          zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
          acceleration: 0.06,
          drag: 0.0005,
          maxSpeed: 1.0
      };
  
      this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    }

  }