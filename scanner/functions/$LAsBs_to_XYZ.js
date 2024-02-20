function $LAsBs_to_XYZ(color) {
    const y = (color.l + 16) / 116;
    const x = color.as / 500 + y;
    const z = y - color.bs / 200;

    const result = {
        x: 0.95047 * $LAsBs_to_XYZ_one_channel(x),
        y: $LAsBs_to_XYZ_one_channel(y),
        z: 1.08883 * $LAsBs_to_XYZ_one_channel(z)
    };
    
    if (color.a !== undefined) {
        result.a = color.a;
    }

    return result;
}