function validateInt(value, defaultValue) {
        return typeof (value) === "undefined" || value === null ? value = defaultValue : parseInt(value);
    }