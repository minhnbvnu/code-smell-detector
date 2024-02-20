function length2em(length, size, scale, em) {
        if (size === void 0) {
            size = 0;
        }
        if (scale === void 0) {
            scale = 1;
        }
        if (em === void 0) {
            em = 16;
        }
        if (typeof length !== 'string') {
            length = String(length);
        }
        if (length === '' || length == null) {
            return size;
        }
        if (exports.MATHSPACE[length]) {
            return exports.MATHSPACE[length];
        }
        var match = length.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
        if (!match) {
            return size;
        }
        var m = parseFloat(match[1] || '1'), unit = match[2];
        if (exports.UNITS.hasOwnProperty(unit)) {
            return m * exports.UNITS[unit] / em / scale;
        }
        if (exports.RELUNITS.hasOwnProperty(unit)) {
            return m * exports.RELUNITS[unit];
        }
        if (unit === '%') {
            return m / 100 * size;
        }
        return m * size;
    }