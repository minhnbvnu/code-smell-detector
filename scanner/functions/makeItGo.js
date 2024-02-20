function makeItGo() {
      hasStarted = true;
      logoSprite.inputEnabled = false;
      pressRedButtonToStart.visible = false;
      faceCameraAndCheckLighting.visible = false;

      if (K_LOGO_ANIMATION) {
        logoAnimationTimer = game.time.create(false);

        let logoFrameIdx = 78;

        logoAnimationTimer.loop(
          30,
          () => {
            logoSprite.loadTexture(`logoFrame${logoFrameIdx}`);

            if (logoFrameIdx === 0) {
              logoAnimationTimer.stop();

              game.camera.onFadeComplete.addOnce(() => {
                notValidatedTimer.stop();
                validatedTimer.stop();

                game.state.start("dataInit");
              });

              game.camera.fade(0x000000, 300);
            } else {
              logoFrameIdx -= 1;
            }
          },
          this
        );

        logoAnimationTimer.start();
      } else {
        game.camera.onFadeComplete.addOnce(() => {
          notValidatedTimer.stop();
          validatedTimer.stop();

          game.state.start("dataInit");
        });

        game.camera.fade(0x000000, 300);
      }
    }