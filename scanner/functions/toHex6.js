function toHex6(/** @type {string} */ s) {
            const val = parseInt(s, 16);
            if (val < 0 || val > 65536) {
                throw new Error("Invalid hex value : " + s);
            }
            return s;
        }