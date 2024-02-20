function drawSpaceship() {
    var image = new Image(); // Image constructor
    image.src = './images/spaceship.png';
    ctx.drawImage(image, spaceshipX, spaceshipY, 60, 60);
    ctx.closePath();
}