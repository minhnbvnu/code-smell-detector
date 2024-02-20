function valToHex(val) {
        const hex = Math.min(Math.max(Math.round(val), 0), 255).toString(16);
        return hex.length == 2 ? hex : "0" + hex;
    }