function parseFloatAndClamp(val, min, max, noneValue) {
    var num = parseFloat(val);
    if (isNaN(num)) {
        return (typeof noneValue !== "undefined") ? noneValue : min;
    } else {
        return Math.min(Math.max(min, val), max);
    }
}