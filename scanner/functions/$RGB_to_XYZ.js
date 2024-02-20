function $RGB_to_XYZ(color) {
    // Observer = 2°, Illuminant = D65
    const result = {
        x: color.r * 0.4124 + color.g * 0.3576 + color.b * 0.1805,
        y: color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722,
        z: color.r * 0.0193 + color.g * 0.1192 + color.b * 0.9505
    };

    if (color.a !== undefined) {
        result.a = color.a;
    }

    return result;
}