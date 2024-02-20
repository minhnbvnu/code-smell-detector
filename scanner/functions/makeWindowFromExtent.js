function makeWindowFromExtent(source, extent, resolution) {
    const [oX, oY] = source.origin;
    const [imageResX, imageResY] = resolution;

    const wnd = [
        Math.round((extent.west - oX) / imageResX),
        Math.round((extent.north - oY) / imageResY),
        Math.round((extent.east - oX) / imageResX),
        Math.round((extent.south - oY) / imageResY),
    ];

    const xMin = Math.min(wnd[0], wnd[2]);
    let xMax = Math.max(wnd[0], wnd[2]);
    const yMin = Math.min(wnd[1], wnd[3]);
    let yMax = Math.max(wnd[1], wnd[3]);

    // prevent zero-sized requests
    if (Math.abs(xMax - xMin) === 0) {
        xMax += 1;
    }
    if (Math.abs(yMax - yMin) === 0) {
        yMax += 1;
    }

    return [xMin, yMin, xMax, yMax];
}