function computeMinMaxElevation(texture, pitch, options) {
    const { width, height, data } = texture.image;
    if (!data) {
        // Return null values means there's no elevation values.
        // They can't be determined.
        // Don't return 0 because the result will be wrong
        return { min: null, max: null };
    }

    // compute the minimum and maximum elevation on the 4 corners texture.
    let { min, max } = minMax4Corners(texture, pitch, options);

    const sizeX = Math.floor(pitch.z * width);

    if (sizeX > 2) {
        const sizeY = Math.floor(pitch.z * height);
        const xs = Math.floor(pitch.x * width);
        const ys = Math.floor(pitch.y * height);
        const inc = Math.max(Math.floor(sizeX / 32), 2);
        const limX = ys + sizeY;
        for (let y = ys; y < limX; y += inc) {
            const pit = y * (width || 0);
            let x = pit + xs;
            const limX = x + sizeX;
            for (x; x < limX; x += inc) {
                const val = data[x];
                if (val !== options.noDataValue) {
                    max = Math.max(max, val);
                    min = Math.min(min, val);
                }
            }
        }
        if (options.zmin > min) { min = options.zmin; }
        if (options.zmax < max) { max = options.zmax; }
    }

    if (max === -Infinity || min === Infinity) {
        // Return null values means the elevation values are incoherent
        // They can't be determined.
        // Don't return 0, -Infinity or Infinity because the result will be wrong
        return { min: null, max: null };
    } else {
        return { min, max };
    }
}