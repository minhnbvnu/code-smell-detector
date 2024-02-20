function hsyToRgb(h, s, y) {

        h = h % 360;
        var r, g, b, k; // Intermediate variable.

        if (h >= 0 && h < 60) {           // Sector 0: 0° - 60°
            k = s * h / 60;
            b = y - R * s - G * k;
            r = b + s;
            g = b + k;
        } else if (h >= 60 && h < 120) {  // Sector 1: 60° - 120°
            k = s * (h - 60) / 60;
            g = y + B * s + R * k;
            b = g - s;
            r = g - k;
        } else if (h >= 120 && h < 180) { // Sector 2: 120° - 180°
            k = s * (h - 120) / 60;
            r = y - G * s - B * k;
            g = r + s;
            b = r + k;
        } else if (h >= 180 && h < 240) { // Sector 3: 180° - 240°
            k = s * (h - 180) / 60;
            b = y + R * s + G * k;
            r = b - s;
            g = b - k;
        } else if (h >= 240 && h < 300) { // Sector 4: 240° - 300°
            k = s * (h - 240) / 60;
            g = y - B * s - R * k;
            b = g + s;
            r = g + k;
        } else {                          // Sector 5: 300° - 360°
            k = s * (h - 300) / 60;
            r = y + G * s + B * k;
            g = r - s;
            b = r - k;
        }

        // Approximations erros can cause values to exceed bounds.

        r = min(max(r, 0), 1) * 255;
        g = min(max(g, 0), 1) * 255;
        b = min(max(b, 0), 1) * 255;
        return [r, g, b];
    }