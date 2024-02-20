function drawRocket() {
    var image = new Image(); // Image constructor
    image.src = './images/kuberocket.png';
    ctx.drawImage(image, rocketX, rocketY, 20, 20);
    ctx.closePath();

    if (checkRocketAlienCollision()) {
        rocketY = -100;
        rocketX = -100;
        collisionDetected = false;
        return
    }

    if(shot && rocketLaunched) {
        if (rocketY < 0) {
            shot = false;
            rocketLaunched = false;
        }
        else {
            rocketY = rocketY -= rocketSpeed;
        }
    }
    else {
        rocketX = spaceshipX + (spaceshipWidth / 2);
        rocketY = spaceshipY;
        rocketLaunched = true
    }
}