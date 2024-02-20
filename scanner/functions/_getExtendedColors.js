function _getExtendedColors(numbers) {
        var r, g, b;
        var n = numbers.shift();
        if (n === 2 && numbers.length >= 3) {
            // 24-bit RGB
            r = numbers.shift();
            g = numbers.shift();
            b = numbers.shift();
            if ([r, g, b].some(function (c) { return c < 0 || 255 < c; })) {
                throw new RangeError("Invalid range for RGB colors");
            }
        } else if (n === 5 && numbers.length >= 1) {
            // 256 colors
            var idx = numbers.shift();
            if (idx < 0) {
                throw new RangeError("Color index must be >= 0");
            } else if (idx < 16) {
                // 16 default terminal colors
                return idx;
            } else if (idx < 232) {
                // 6x6x6 color cube, see https://stackoverflow.com/a/27165165/500098
                r = Math.floor((idx - 16) / 36);
                r = r > 0 ? 55 + r * 40 : 0;
                g = Math.floor(((idx - 16) % 36) / 6);
                g = g > 0 ? 55 + g * 40 : 0;
                b = (idx - 16) % 6;
                b = b > 0 ? 55 + b * 40 : 0;
            } else if (idx < 256) {
                // grayscale, see https://stackoverflow.com/a/27165165/500098
                r = g = b = (idx - 232) * 10 + 8;
            } else {
                throw new RangeError("Color index must be < 256");
            }
        } else {
            throw new RangeError("Invalid extended color specification");
        }
        return [r, g, b];
    }