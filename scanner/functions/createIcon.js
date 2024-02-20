async function createIcon(dotColor) {
    const width = 48;
    const height = width;
    const canvas = createCanvas(width, height)
    const img = await loadImage("/icons/icon.svg")
    const context = canvas.getContext('2d')

    context.drawImage(img, 0, 0, width, height);
    if (dotColor !== null) {
        context.beginPath();
        context.arc(8, 40, 7, 0, 2 * Math.PI, false);
        context.fillStyle = dotColor;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = "black";
        context.stroke();

        /* fox don't cry */
        if (dotColor === "#ff0000") {
            context.beginPath();
            context.ellipse(33, 28, .1, .5, 0, 0, 2 * Math.PI);
            context.lineWidth = 2;
            context.strokeStyle = "#ffffff";
            context.stroke();
        }

    }
    return [canvas, context.getImageData(0, 0, width, height)]
}