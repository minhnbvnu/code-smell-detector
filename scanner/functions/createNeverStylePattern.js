function createNeverStylePattern(markers) {
        const pattern = `^(${markers.map(escape).join("|")})?[ \t]+`;
        return new RegExp(pattern, "u");
    }