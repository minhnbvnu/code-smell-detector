function toGradientData(v1, v2, v3, v4, v5) {
    var startColor, endColor, type, rotation, spread, d;
    var data = {};

    if (arguments.length === 1) { // The argument is a dictionary or undefined.
        d = v1 || {};
        startColor = d.startColor;
        endColor = d.endColor;
        type = d.type;
        rotation = d.rotation;
        spread = d.spread;
    } else if (arguments.length >= 2) { // The first two arguments are a start color and an end color.
        startColor = v1;
        endColor = v2;
        type = 'linear';
        rotation = 0;
        spread = 0;
        if (arguments.length === 3) {
            if (typeof v3 === 'string') { // The type can be either linear or radial.
                type = v3;
            } else if (typeof v3 === 'number') { // The type is implicitly linear and the third argument is the rotation angle.
                rotation = v3;
            }
        } else if (arguments.length === 4) {
            if (typeof v3 === 'number') { // The type is implicitly linear and the third/forth arguments are the rotation angle and gradient spread.
                rotation = v3;
                spread = v4;
            } else if (v3 === 'linear') { // The type is explicitly linear and the forth argument is the rotation angle.
                rotation = v4;
            } else if (v3 === 'radial') { // The type is explicitly radial and the forth argument is the gradient spread.
                type = v3;
                spread = v4;
            } else {
                throw new Error('Wrong argument provided: ' + v3);
            }
        } else if (arguments.length === 5) { // Type, rotation (unused in case of radial type gradient), and gradient spread.
            type = v3;
            rotation = v4;
            spread = v5;
        }
    }

    if (!startColor && startColor !== 0) {
        throw new Error('No startColor was given.');
    }
    if (!endColor && endColor !== 0) {
        throw new Error('No endColor was given.');
    }

    try {
        data.startColor = toColor(startColor);
    } catch (e1) {
        throw new Error('startColor is not a valid color: ' + startColor);
    }

    try {
        data.endColor = toColor(endColor);
    } catch (e2) {
        throw new Error('endColor is not a valid color: ' + endColor);
    }

    if (type === undefined) {
        type = 'linear';
    }
    if (type !== 'linear' && type !== 'radial') {
        throw new Error('Unknown gradient type: ' + type);
    }

    data.type = type;

    if (spread === undefined) {
        spread = 0;
    }
    if (typeof spread !== 'number') {
        throw new Error('Spread value is not a number: ' + spread);
    }

    if (type === 'linear') {
        if (rotation === undefined) {
            rotation = 0;
        }
        if (typeof rotation !== 'number') {
            throw new Error('Rotation value is not a number: ' + rotation);
        }
        data.rotation = rotation;
    }

    data.spread = clamp(spread, 0, 0.99);

    return data;
}