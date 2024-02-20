function getColors($canvas, $video, width, height) {
    const ctx = $canvas.getContext('2d');
    $canvas.width = width;
    $canvas.height = height;
    ctx.drawImage($video, 0, 0);
    return matrixCallback((xIndex, yIndex, x, y) => {
        const itemW = width / x;
        const itemH = height / y;
        const itemX = xIndex * itemW;
        const itemY = yIndex * itemH;
        if (itemW < 1 || itemH < 1) return { r: 0, g: 0, b: 0 };
        const { data } = ctx.getImageData(itemX, itemY, itemW, itemH);
        let r = 0;
        let g = 0;
        let b = 0;
        for (let i = 0, l = data.length; i < l; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
        }
        r = Math.floor(r / (data.length / 4));
        g = Math.floor(g / (data.length / 4));
        b = Math.floor(b / (data.length / 4));
        return { r, g, b };
    });
}