function isNodeSpecificOption(option) {
        return isObject(option) || typeof option === "string";
    }