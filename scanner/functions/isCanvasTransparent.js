function isCanvasTransparent(canvas) {
    const context = canvas.getContext('2d');
    const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;

    for (let i = 3; i < pixelData.length; i += 4) {
        if (pixelData[i] < 255) {
            return true;
        }
    }

    return false;
}