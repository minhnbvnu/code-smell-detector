function rgbToHsy(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        var h, s, y;

        // For saturation equals to 0 any value of hue are valid.
        // In this case we choose 0 as a default value.

        if (r === g && g === b) {            // Limit case.
            s = 0;
            h = 0;
        } else if ((r >= g) && (g >= b)) { // Sector 0: 0° - 60°
            s = r - b;
            h = 60 * (g - b) / s;
        } else if ((g > r) && (r >= b)) {  // Sector 1: 60° - 120°
            s = g - b;
            h = 60 * (g - r) / s + 60;
        } else if ((g >= b) && (b > r)) {  // Sector 2: 120° - 180°
            s = g - r;
            h = 60 * (b - r) / s + 120;
        } else if ((b > g) && (g > r)) {   // Sector 3: 180° - 240°
            s = b - r;
            h = 60 * (b - g) / s + 180;
        } else if ((b > r) && (r >= g)) {  // Sector 4: 240° - 300°
            s = b - g;
            h = 60 * (r - g) / s + 240;
        } else {                           // Sector 5: 300° - 360°
            s = r - g;
            h = 60 * (r - b) / s + 300;
        }

        y = R * r + G * g + B * b;

        // Approximations erros can cause values to exceed bounds.

        return [h % 360,
            min(max(s, 0), 1),
            min(max(y, 0), 1)];
    }