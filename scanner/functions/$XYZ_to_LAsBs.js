function $XYZ_to_LAsBs(color) {
    const x = $XYZ_to_LAsBs_one_channel(color.x * (1 / 0.95047));
    const y = $XYZ_to_LAsBs_one_channel(color.y);
    const z = $XYZ_to_LAsBs_one_channel(color.z * (1 / 1.08883));

    // if (116 * y - 16 < 0) $error('Invalid input for XYZ');
    const result = {
        l: $Math.max(0, 116 * y - 16),
        as: 500 * (x - y),
        bs: 200 * (y - z)
    };
    
    if (color.a !== undefined) {
        result.a = color.a;
    }

    return result;
}