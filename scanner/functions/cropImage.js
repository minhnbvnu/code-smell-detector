function cropImage(img, cropValues = { width: img.naturalWidth, height: img.naturalHeight }) {
    canvas.width = cropValues.width;
    canvas.height = cropValues.height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img,
        cropValues.x || 0, cropValues.y || 0, cropValues.width, cropValues.height,
        0, 0, cropValues.width, cropValues.height);
    return ctx.getImageData(0, 0, cropValues.width, cropValues.height);
}