function drawAlien(alienX, alienY, name, status) {
    var image = new Image(); // Image constructor
    if (nodes.some((node) => node.name == name)) {
        image.src = './images/k8s_node.png';
        ctx.drawImage(image, alienX, alienY, 30, 40);
    }
    else {
        image.src = `./images/sprite_invader_${status}.png`;
        ctx.font = '8px pixel';
        ctx.drawImage(image, alienX, alienY, 40, 40);
        if (showPodName) {
            ctx.fillText(name.substring(0, 19) + '..', alienX, alienY + 40);
        }
    }
    ctx.closePath();
}