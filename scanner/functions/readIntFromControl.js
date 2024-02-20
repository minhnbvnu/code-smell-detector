function readIntFromControl(controlName, defaultValue) {
    const a = parseInt(document.getElementById(controlName).value)
    if (! isFinite(a)) {
        return defaultValue === undefined ? 0 : defaultValue;
    } else {
        return Math.round(a);
    }
}