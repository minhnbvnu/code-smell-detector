function $XYZ_to_RGB(color) {
    // Observer = 2°, Illuminant = D65
    const result = {
        r: color.x * 3.2406 + color.y * -1.5372 + color.z * -0.4986,
        g: color.x * -0.9689 + color.y * 1.8758 + color.z * 0.0415,
        b: color.x * 0.0557 + color.y * -0.204 + color.z * 1.057
    };

    if (color.a !== undefined) {
        result.a = color.a;
    }

    return result;
}