function minMax4Corners(texture, pitch, options) {
    const u = pitch.x;
    const v = pitch.y;
    const w = pitch.z;
    const z = [
        readTextureValueWithBilinearFiltering(options, texture, u, v),
        readTextureValueWithBilinearFiltering(options, texture, u + w, v),
        readTextureValueWithBilinearFiltering(options, texture, u + w, v + w),
        readTextureValueWithBilinearFiltering(options, texture, u, v + w),
    ].filter(val => val != undefined);

    if (z.length) {
        return { min: Math.min(...z), max: Math.max(...z) };
    } else {
        return {
            min: Infinity,
            max: -Infinity,
        };
    }
}