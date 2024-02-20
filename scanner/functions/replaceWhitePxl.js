function replaceWhitePxl(imgd, color, id) {
    if (!color) {
        return imgd;
    }
    const imgdColored = cacheStyle.get(id, color);
    if (!imgdColored) {
        const pix = imgd.data;
        const newColor = new Color(color);
        const colorToChange = new Color('white');
        for (let i = 0, n = pix.length; i < n; i += 4) {
            const d = deltaE(pix.slice(i, i + 3), colorToChange) / 100;
            pix[i] = (pix[i] * d +  newColor.r * 255 * (1 - d));
            pix[i + 1] = (pix[i + 1] * d +  newColor.g * 255 * (1 - d));
            pix[i + 2] = (pix[i + 2] * d +  newColor.b * 255 * (1 - d));
        }
        cacheStyle.set(imgd, id, color);
        return imgd;
    }
    return imgdColored;
}