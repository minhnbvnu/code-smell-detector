function toHex4(/** @type {string} */ s) {
            const val = parseInt(s);
            if (val < 0 || val > 255) {
                throw new Error("Invalid value : " + s);
            }
            return val.toString(16).padStart(2, "0");
        }