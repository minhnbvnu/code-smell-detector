function getAnimation(moveX, moveY) {

        if (Input.keyboard.enter || Input.keyboard.space) {
            if (moveX < 0) {
                currentPlayerAnimation = attack.left;
            } else {
                currentPlayerAnimation = attack.right;
            }

            if (currentPlayerAnimation.tick === 1) {
                SoundJS.play('swish');
            }
            currentPlayerAnimation.next(Scene.ticker.lastTicksElapsed);

            return currentPlayerAnimation;
        }

        if (moveY === 0 && moveX === 0) {
            currentPlayerAnimation = walk.down;
            currentPlayerAnimation.go(0);

            return;
        }

        if (moveY < 0) {
            currentPlayerAnimation = walk.up;
        } else if (moveY > 0) {
            currentPlayerAnimation = walk.down;
        } else if (moveX > 0) {
            currentPlayerAnimation = walk.right;
        } else if (moveX < 0) {
            currentPlayerAnimation = walk.left;
        }

        currentPlayerAnimation.next(Scene.ticker.lastTicksElapsed);
    }